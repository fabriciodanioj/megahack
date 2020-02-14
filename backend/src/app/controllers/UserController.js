import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        phone: Yup.number().required(),
        document: Yup.number().required(),
        date_of_birth: Yup.string().required(),
        password: Yup.string()
          .required()
          .min(6),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).send({ error: 'Validation fails' });
      }

      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        return res.status(400).send({ error: 'This user already exists' });
      }

      const { id, name, email } = await User.create(req.body);

      return res.status(201).send({
        id,
        name,
        email,
      });
    } catch (err) {
      return res.send({
        error: {
          title: 'Create user failed',
          messages: err,
        },
      });
    }
  }

  async delete(req, res) {
    try {
      await User.destroy({
        where: { id: req.userId },
      });

      return res.send();
    } catch (err) {
      return res.send({
        error: {
          title: 'Delete user failed',
          messages: err,
        },
      });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        phone: Yup.number(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).send({ error: 'Validation fails' });
      }

      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).send({ error: 'This user already exists' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).send({ error: 'Password does not match' });
      }

      const { id, name, phone } = await user.update(req.body);

      return res.status(201).send({
        id,
        name,
        email,
        phone,
      });
    } catch (err) {
      return res.send({
        error: {
          title: 'Update user failed',
        },
      });
    }
  }
}

export default new UserController();
