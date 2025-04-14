export interface DefaultTimeStampsColumns {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface DefaultInterface extends DefaultTimeStampsColumns {
  id: number;
}

