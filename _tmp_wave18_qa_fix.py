from pathlib import Path
import re

base = Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave18")
for f in base.rglob("index.html"):
    s = f.read_text(encoding="utf-8")
    orig = s

    s = re.sub(r"href='tel:(\d{10})'", r"href='tel:+1\1'", s)

    repls = {
        "<input id='name' name='name' type='text' required autocomplete='name'/>": "<input id='name' name='name' type='text' required autocomplete='name' aria-label='Full Name'/>",
        "<input id='phone' name='phone' type='tel' required autocomplete='tel'/>": "<input id='phone' name='phone' type='tel' required autocomplete='tel' aria-label='Phone Number'/>",
        "<input id='qname' name='name' type='text' required autocomplete='name'/>": "<input id='qname' name='name' type='text' required autocomplete='name' aria-label='Full Name'/>",
        "<input id='qphone' name='phone' type='tel' required autocomplete='tel'/>": "<input id='qphone' name='phone' type='tel' required autocomplete='tel' aria-label='Phone Number'/>",
        "<textarea id='qdetails' name='details' required></textarea>": "<textarea id='qdetails' name='details' required aria-label='Project details'></textarea>",
    }
    for a, b in repls.items():
        s = s.replace(a, b)

    if "charlotte-roofing-group-charlotte-nc" in str(f).replace("\\", "/"):
        s = s.replace(
            "<a href='tel:+19802792497'>(980) 279-2497</a> | <span style='color:var(--muted)'>Email pending verification</span><br/><small>Demo form routes to secure contact intake endpoint.</small>",
            "<a href='tel:+19802792497'>(980) 279-2497</a><br/><small>Demo form routes to secure contact intake endpoint.</small>",
        )

    if s != orig:
        f.write_text(s, encoding="utf-8")
        print(f"patched {f}")
