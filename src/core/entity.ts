import { randomUUID } from 'crypto';

const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

abstract class Entity<Props> {
  protected readonly _id: string;
  protected readonly _props: Props;
  protected readonly _datesAt: DatesAt;
  private readonly _errors: Map<string, Error> = new Map();

  constructor(props: Props, id?: string, datesAt?: DatesAt) {
    this._id = id || randomUUID();
    this._props = props;
    this._datesAt = {
      createdAt: datesAt?.createdAt || new Date(),
      updatedAt: datesAt?.updatedAt || new Date(),
      deletedAt: datesAt?.deletedAt,
    };
  }

  get id() {
    return this._id;
  }

  get props() {
    return this._props;
  }

  get errors() {
    return this._errors;
  }

  get createdAt() {
    return this._datesAt.createdAt;
  }

  get updatedAt() {
    return this._datesAt.updatedAt;
  }

  get deletedAt() {
    return this._datesAt.deletedAt;
  }

  protected includeNewError(error: Error) {
    this._errors.set(randomUUID(), error);
  }

  public equals(object?: Entity<Props>): boolean {
    if (object == null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id === object._id;
  }

  public isValid(): boolean {
    return this._errors.size === 0;
  }
}

type DatesAt = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export { Entity, DatesAt };
