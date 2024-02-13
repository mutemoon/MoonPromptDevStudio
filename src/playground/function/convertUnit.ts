export type TWeightUnit = "克" | "千克" | "斤" | "公斤";
export type TLiquidUnit = "升" | "毫升";

export type TUnit = TWeightUnit | TLiquidUnit;

export type TArgs = {
  value: number;
  from: TUnit;
  to: TUnit;
};

export function convertUnit(args: TArgs): number {
  const { value, from, to } = args;

  // 定义单位到克和毫升的基本转换率
  const conversionRates = {
    克: 1,
    千克: 1000,
    斤: 500,
    公斤: 1000,
    升: 1000,
    毫升: 1,
  };

  // 计算从原始单位到目标单位的转换值
  const fromToGramOrMl = value * conversionRates[from]; // 先转换到基本单位（克或毫升）
  const result = fromToGramOrMl / conversionRates[to]; // 再从基本单位转换到目标单位

  return result;
}

function getRes(prompt: string): string {
    return "Hello, World!"
}

function parse(actions: Record<string, Function>, response: string): Function[] {
    return [() => {}]
}

const actions = {
    convertUnit
}
const ingredients = `500克大米 200毫升水 3个鸡蛋`
const userInput = `我买了一斤大米`
const prompt = `ingredients: ${ingredients}
userInput: ${userInput}
actions: ${Object.keys(actions).join(', ')}`

const res = getRes(prompt)
const tasks = parse(actions, res)

tasks.forEach(task => task())