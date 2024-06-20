interface lang {
  source_lang_user_selected: string;
  target_lang: string;
}

interface commonJobParams {
  wasSpoken: boolean;
  transcribe_as: string;
  regionalVariant: string | null;
}

interface params {
  texts: Array<{ text: string; requestAlternatives: number }>;
  splitting: string;
  lang: lang;
  timestamp: number;
  commonJobParams: commonJobParams;
}

interface text {
  text: string;
  requestAlternatives: number;
}

interface postData {
  jsonrpc: string;
  method: string;
  id: number;
  params: params;
}

interface translation {
  text: string;
}

interface deepLXTranslationResult {
  code: number;
  id: number;
  message: string;
  data: string;
  alternatives: Array<string>;
  source_lang: string;
  target_lang: string;
  method: string;
}
