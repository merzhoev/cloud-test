export enum Sex {
  MAN = 'man',
  WOMAN = 'woman',
}

export interface ZeroStepFields {
  phone: string;
  email: string;
}

export interface FirstStepFields {
  nickname: string;
  name: string;
  sername: string;
  sex?: Sex;
}

export interface SecondStepFields {
  advantages: string[];
  checkbox: number[];
  radio: number;
}

export interface ThirdStepFields {
  about: string;
}
