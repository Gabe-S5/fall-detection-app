import { User } from "./user";
import { Incident } from "./incident";

User.hasMany(Incident, { foreignKey: "userId", onDelete: "CASCADE" });
Incident.belongsTo(User, { foreignKey: "userId" });

export { User, Incident };
