import { randomInt } from "crypto";

export async function translateByDeepLX(
  source_lang: string,
  target_lang: string,
  translateText: string
): Promise<deepLXTranslationResult | {
    code: number,
    message: string,
}> {
  let id = getRandomNumber();
  if (!source_lang) {
    // todo detect language
    source_lang = "en";
  }
  if (!translateText) {
    return {
      code: 404,
      message: "No text to translate",
    };
  }

  const www2URL = `https://www2.deepl.com/jsonrpc`;
  id = id + 1;
  const postData = initDeepLXData(source_lang, target_lang);
  const text: text = {
    text: translateText,
    requestAlternatives: 3,
  };
  postData.id = id;
  postData.params.texts.push(text);
  postData.params.timestamp = getTimestamp(getICount(translateText));
  let postStr = JSON.stringify(postData);

  if ((id + 5) % 29 == 0 || (id + 3) % 13 == 0) {
    postStr = postStr.replace(`"method":"`, `"method" : "`);
  } else {
    postStr = postStr.replace(`"method":"`, `"method": "`);
  }
  const request = await fetch(www2URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*",
      "x-app-os-name": "iOS",
      "x-app-os-version": "16.3.0",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "x-app-device": "iPhone13,2",
      "User-Agent": "DeepL-iOS/2.9.1 iOS 16.3.0 (iPhone13,2)",
      "x-app-build": "510265",
      "x-app-version": "2.9.1",
      "Connection": "keep-alive",
    },
    body: postStr,
  });
  const response = await request.json();
  const deepLXTranslationResult: deepLXTranslationResult = {
    code: 200,
    message: "Success",
    id: id,
    data: response.result.texts[0].text,
    alternatives: response.result.texts[0].alternatives.map(
      (item: { text: string }) => item.text
    ),
    source_lang: source_lang,
    target_lang: target_lang,
    method: "deeplx-next by github.com/1939323749",
  };
  return deepLXTranslationResult;
}

function getICount(text: string): number {
  let i = 0;
  for (let j = 0; j < text.length; j++) {
    if (text.charAt(j) == "i") {
      i++;
    }
  }
  return i;
}

function getTimestamp(i: number): number {
  const ts = new Date().getTime();
  if (i != 0) {
    i = i + 1;
    return ts - (ts % i) + i;
  } else {
    return ts;
  }
}

function getRandomNumber(): number {
  const randomNumber = randomInt(8300000, 8399999);
  return randomNumber * 1000;
}

function initDeepLXData(source_lang: string, target_lang: string) {
  const texts: Array<text> = [];
  const commonJobParams: commonJobParams = {
    wasSpoken: false,
    transcribe_as: "",
    regionalVariant: null,
  };
  const params: params = {
    texts: texts,
    splitting: "newlines",
    lang: {
      source_lang_user_selected: source_lang,
      target_lang: target_lang,
    },
    timestamp: 0,
    commonJobParams: commonJobParams,
  };
  const data: postData = {
    jsonrpc: "2.0",
    method: "LMT_handle_texts",
    id: 0,
    params: params,
  };
  return data;
}
