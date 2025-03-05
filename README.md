> [!WARNING]  
> Due to no maintenance for a period of time, this method is currently invalid. Please refer to:[DeepLX](https://github.com/OwO-Network/DeepLX)
# deeplx-next

[![Netlify Status](https://api.netlify.com/api/v1/badges/42b544a8-ba8f-4b7b-8674-6f7bb676c9d9/deploy-status)](https://app.netlify.com/sites/deeplx-next/deploys)

This is a simple implement in typescript of the deeplx project.

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"text": "Hello, world!", "source_lang": "en", "target_lang": "zh"}' https://deeplx-next.netlify.app/api/translate | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   274    0   207  100    67    131     42  0:00:01  0:00:01 --:--:--   174
{
  "code": 200,
  "id": 8355413001,
  "data": "你好，世界",
  "alternatives": [
    "世界，你好",
    "你好，世界！",
    "大家好"
  ],
  "source_lang": "en",
  "target_lang": "zh",
  "method": "deeplx-next by github.com/1939323749"
}
```
