const bcrypt = require("bcryptjs");

const user_name = 'ironman'
const password = '123456'
const user_db_name = 'incident_users';
const salt = '$2a$10$Tf4IsW.6IH0UEyBDt6TjVO';
const nano = require('nano')(`http://${user_name}:${password}@localhost:5984`);

const getDefaultPasswordHash = function() {
    return new Promise((resolve, reject) => {
        bcrypt.hash('123456', salt, function(err, password_hash) {
            if(err) {
                return reject(err)
            }
            return resolve(password_hash);
        });
    })
};

const setupDatabaseAndUsers = async () => {
    try {
        await nano.db.create(user_db_name);
        const db = nano.use(user_db_name);
        const defaultPassword = await getDefaultPasswordHash();
        
        await db.insert({
            name: 'admin_user_one',
            email: 'admin1@example.com',
            dob:  new Date('1990/01/01'),
            password: defaultPassword,
            roles: ['user', 'admin']
        });

        await db.insert({
            name: 'admin_user_two',
            email: 'admin2@example.com',
            dob:  new Date('1990/02/01'),
            password: defaultPassword,
            roles: ['user', 'admin']
        });

        await db.insert({
            name: 'incident_user_one',
            email: 'incident_user1@example.com',
            dob:  new Date('1990/02/01'),
            password: defaultPassword,
            roles: ['user']
        });

        await db.insert({
            name: 'incident_user_two',
            email: 'incident_user2@example.com',
            dob:  new Date('1990/01/01'),
            password: defaultPassword,
            roles: ['user']
        });
    } catch (error) {
        return error;
    }
};

setupDatabaseAndUsers().then(() => {
    console.log('sucessfully finished setting up the incident-users database');
}).catch(err => {
    console.log('error occurred while setting up the incident-users database', err);
});
