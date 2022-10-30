//* index file of routes

import { Router } from 'express';
import contact from './contact.js';
import customer from './customer.js';
import project from './project.js';
import role from './role.js';
import section from './section.js';
import skill from './skill.js';
import status from './status.js';
import task from './task.js';
import team from './team.js';
import user from './user.js';
import auth from './auth.js';
import generalValue from './generalValue.js';

const router = Router();

router.use('/contact', contact);
router.use('/customer', customer);
router.use('/project', project);
router.use('/role', role);
router.use('/section', section);
router.use('/skill', skill);
router.use('/status', status);
router.use('/task', task);
router.use('/team', team);
router.use('/user', user);
router.use('/auth', auth);
router.use('/generalValue', generalValue);

export default router;


