import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Incident extends Model {
  public id!: string;
  public userId!: string;
  public type!: string;
  public description!: string;
  public summary?: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Incident.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "Incident",
    timestamps: true,
  }
);
