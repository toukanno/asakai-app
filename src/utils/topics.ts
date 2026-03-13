import { Topic, TopicCategory } from '../types';

const TOPICS: Record<TopicCategory, string[]> = {
  icebreaker: [
    '最近ハマっていることは？',
    '今朝の朝ごはんは何でしたか？',
    '最近見た映画やドラマでおすすめは？',
    '週末は何をしましたか？',
    '最近買ってよかったものは？',
    '子供の頃の夢は何でしたか？',
    '無人島に1つだけ持っていくなら？',
    '今一番行きたい場所は？',
    '最近読んだ本でおすすめは？',
    '自分を動物に例えると？',
    '10年後の自分はどうなっていると思う？',
    'タイムマシンがあったらいつに行く？',
    '最近嬉しかったことは？',
    '好きな季節とその理由は？',
    'もし1日だけ別の職業になれるなら？',
  ],
  work: [
    '最近の業務で学んだことは？',
    'チームで改善したいことはありますか？',
    '今取り組んでいるタスクの進捗を共有しましょう',
    '最近のプロジェクトで困っていることは？',
    '他のチームメンバーに感謝したいことは？',
    '今週の目標を共有しましょう',
    '業務効率化のアイデアはありますか？',
    '最近試した新しいツールや技術は？',
    'お客様からのフィードバックで印象的だったことは？',
    '今後挑戦したい技術やスキルは？',
  ],
  fun: [
    'もし宝くじが当たったら何をする？',
    '好きな食べ物ベスト3は？',
    'カラオケの十八番は？',
    '最近笑ったエピソードを教えて！',
    'おすすめのお店を教えて！',
    '今年やりたいことリストは？',
    '子供の頃の一番の思い出は？',
    '特技や隠れた才能はある？',
    'もし芸能人に会えるなら誰に会いたい？',
    '最近のマイブームは？',
  ],
  growth: [
    '最近挑戦したことは？',
    '今年身につけたいスキルは？',
    '尊敬する人とその理由は？',
    '最近の失敗から学んだことは？',
    '自分の強みだと思うことは？',
    '5年後のキャリアプランは？',
    '最近読んだビジネス書でおすすめは？',
    '仕事で大切にしている価値観は？',
    'メンターにしたい人は誰？その理由は？',
    '自分が成長したと感じる瞬間は？',
  ],
};

const CATEGORY_LABELS: Record<TopicCategory, string> = {
  icebreaker: 'アイスブレイク',
  work: '仕事',
  fun: '楽しい話題',
  growth: '成長・学び',
};

let usedTopicIndices: Record<TopicCategory, Set<number>> = {
  icebreaker: new Set(),
  work: new Set(),
  fun: new Set(),
  growth: new Set(),
};

export function getCategoryLabel(category: TopicCategory): string {
  return CATEGORY_LABELS[category];
}

export function getAllCategories(): TopicCategory[] {
  return ['icebreaker', 'work', 'fun', 'growth'];
}

export function generateTopic(category?: TopicCategory): Topic {
  const cat = category || getAllCategories()[Math.floor(Math.random() * 4)];
  const pool = TOPICS[cat];

  if (usedTopicIndices[cat].size >= pool.length) {
    usedTopicIndices[cat].clear();
  }

  let index: number;
  do {
    index = Math.floor(Math.random() * pool.length);
  } while (usedTopicIndices[cat].has(index));

  usedTopicIndices[cat].add(index);

  return {
    id: `${cat}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: pool[index],
    category: cat,
  };
}

export function generateTopics(count: number): Topic[] {
  const topics: Topic[] = [];
  const categories = getAllCategories();
  for (let i = 0; i < count; i++) {
    topics.push(generateTopic(categories[i % categories.length]));
  }
  return topics;
}

export function resetUsedTopics(): void {
  for (const cat of getAllCategories()) {
    usedTopicIndices[cat].clear();
  }
}
