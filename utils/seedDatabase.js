const roleModel = require('../schemas/roles');
const userModel = require('../schemas/users');
const { dataRole, dataUser } = require('./data2');

async function ensureRole(roleData) {
  let existingRole = await roleModel.findOne({ name: roleData.name });
  if (existingRole) {
    return existingRole;
  }

  return roleModel.create({
    name: roleData.name,
    description: roleData.description
  });
}

async function seedDatabase() {
  let userCount = await userModel.countDocuments();
  if (userCount > 0) {
    console.log('seed skipped: users already exist');
    return;
  }

  const roleMap = new Map();
  for (const roleData of dataRole) {
    const savedRole = await ensureRole(roleData);
    roleMap.set(roleData.id, savedRole._id);
  }

  for (const userData of dataUser) {
    const roleId = roleMap.get(userData.role.id);
    await userModel.create({
      username: userData.username,
      password: userData.password,
      email: userData.email,
      fullName: userData.fullName,
      avatarUrl: userData.avatarUrl,
      status: userData.status,
      loginCount: userData.loginCount,
      role: roleId
    });
  }

  console.log(`seed completed: ${dataRole.length} roles, ${dataUser.length} users`);
}

module.exports = {
  seedDatabase
}
