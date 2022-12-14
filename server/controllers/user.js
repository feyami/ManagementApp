import UserSchema from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker/locale/en_US';

//*Generate random data from UserSchema
export const generateRandomData = async (req, res) => {
    try {
        const user = await UserSchema.create({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phoneNumbers: [{ numberType: faker.helpers.arrayElement(['home', 'mobile', 'other']), number: faker.phone.phoneNumber() }, { numberType: faker.helpers.arrayElement(['home', 'mobile', 'other']), number: faker.phone.phoneNumber() }],
            addresses: [{ addressType: faker.helpers.arrayElement(['home', 'other']), address: faker.address.streetAddress() }, { addressType: faker.helpers.arrayElement(['home', 'other']), address: faker.address.streetAddress() }],
            role: faker.helpers.arrayElement(['admin', 'user']),
            is_active: true,
            skills: [],
            password: faker.internet.password(),
            date_of_birth: faker.date.past(),
            google: {
                id: faker.datatype.uuid(),
                displayName: faker.name.findName(),
                name: {
                    familyName: faker.name.lastName(),
                    givenName: faker.name.firstName(),
                    middleName: faker.name.firstName()
                },
                emails: [{ value: faker.internet.email() }],
                photos: [{ value: faker.image.avatar() }]
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUsersBySearch = async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
      try {
    const users = await UserSchema.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };



//* GET all users
export const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find().populate('skills').populate('role');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//* GET user by id
export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserSchema.findById(id).populate('skills').populate('role');
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//* POST create user
export const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new UserSchema(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//* PATCH update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    if (!UserSchema.findById(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await UserSchema.findByIdAndUpdate(id, user, { new: true });
    res.json({ data: updatedUser });
}

//* DELETE delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!UserSchema.findById(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    await UserSchema.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
}




