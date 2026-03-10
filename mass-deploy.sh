#!/bin/bash
# Mass Deployment Script — 160 Sites
# Deploys in batches of 5 with delay to avoid rate limits

cd sites/batch-160

BATCH_SIZE=5
DELAY=30

for dir in */; do
  echo "Deploying $dir..."
  cd "$dir"
  npx vercel --yes --prod 2>&1 | tee deploy.log
  cd ..
  
  # Extract URL from deploy.log
  URL=$(grep -oP 'https://[^\s]+\.vercel\.app' "$dir/deploy.log" | head -1)
  echo "$dir: $URL" >> ../../deployed-urls.txt
  
  sleep $DELAY
done

echo "✅ Batch complete. URLs in deployed-urls.txt"
