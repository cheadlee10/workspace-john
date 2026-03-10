import csv
import sys
from collections import deque


def pct(n, d):
    return (n / d * 100.0) if d else 0.0


def load_rows(path):
    with open(path, newline='', encoding='utf-8') as f:
        return list(csv.DictReader(f))


def evaluate(rows):
    sends = [r for r in rows if (r.get('send_status') or '').lower() == 'sent']
    last100 = sends[-100:]
    last200 = sends[-200:]

    def count(rs, field, val):
        v = val.lower()
        return sum(1 for r in rs if (r.get(field) or '').lower() == v)

    hard_bounce_100 = count(last100, 'bounce_type', 'hard')
    complaints_200 = count(last200, 'complaint', 'yes')
    unsub_today = count(sends, 'unsubscribe', 'yes')

    positive = count(sends, 'positive_reply', 'yes')
    replies = count(sends, 'reply_status', 'positive') + count(sends, 'reply_status', 'neutral') + count(sends, 'reply_status', 'negative')

    total_sent = len(sends)
    hard_bounce_rate_100 = pct(hard_bounce_100, len(last100))
    complaint_rate_200 = pct(complaints_200, len(last200))
    unsub_rate = pct(unsub_today, total_sent)
    positive_rate = pct(positive, total_sent)

    status = 'GO'
    reasons = []

    if hard_bounce_rate_100 >= 3.0:
        status = 'STOP'
        reasons.append(f'hard_bounce_rate_100={hard_bounce_rate_100:.2f}% >= 3.0%')

    if complaint_rate_200 >= 0.15:
        status = 'STOP'
        reasons.append(f'complaint_rate_200={complaint_rate_200:.2f}% >= 0.15%')

    if unsub_rate >= 2.0:
        status = 'STOP'
        reasons.append(f'unsubscribe_rate={unsub_rate:.2f}% >= 2.0%')

    if total_sent >= 200 and positive_rate < 0.3 and status != 'STOP':
        status = 'HOLD'
        reasons.append(f'positive_rate={positive_rate:.2f}% < 0.3% after 200 sends')

    return {
        'status': status,
        'total_sent': total_sent,
        'replies': replies,
        'positive': positive,
        'hard_bounce_rate_100': hard_bounce_rate_100,
        'complaint_rate_200': complaint_rate_200,
        'unsubscribe_rate': unsub_rate,
        'positive_rate': positive_rate,
        'reasons': reasons,
    }


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else 'templates/outbound-500-tracker.csv'
    rows = load_rows(path)
    r = evaluate(rows)

    print(f"STATUS: {r['status']}")
    print(f"SENT: {r['total_sent']}")
    print(f"REPLIES: {r['replies']} | POSITIVE: {r['positive']} ({r['positive_rate']:.2f}%)")
    print(f"HARD_BOUNCE_100: {r['hard_bounce_rate_100']:.2f}%")
    print(f"COMPLAINT_200: {r['complaint_rate_200']:.2f}%")
    print(f"UNSUB_RATE: {r['unsubscribe_rate']:.2f}%")
    if r['reasons']:
        print('REASONS:')
        for reason in r['reasons']:
            print(f"- {reason}")


if __name__ == '__main__':
    main()
