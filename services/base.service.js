const { Op } = require('sequelize');

class BaseService {
    
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const instance = await this.model.create(data);
            return instance;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    async findOne(id) {
        try {
            const instance = await this.model.findByPk(id);
            if (!instance) {
                throw new Error(`Instance with id ${id} not found`);
            }
            return instance;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    async find(filters) {
        try {
            const instances = await this.model.findAll({ ...filters });
            return instances;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    async findWithPagination(queryParams = {}, options = {}) {
        const { limit = 10, skip = 0, sort = 'id', order = 'ASC', search = null } = queryParams;

        const limitObject = { limit: parseInt(limit), offset: parseInt(skip) * parseInt(limit) };

        let orderList = [sort, order];

        if (sort && sort.includes('.')) {
            const [alias, field] = sort.split('.');
            if (alias && field) {
                orderList = [alias, field, order];
            } else {
                orderList = ["id", "ASC"];
            }
        }

        const sortObject = { order: [orderList] };
        let whereObject = {};

        if (search && options.searchFields) {

            let defaultFieldsFilter = options.searchFields.map((field) => {
                if (field.includes('.')) {
                    const aliasedField = `$${field}$`;
                    return {
                        [aliasedField]: { [Op.like]: `%${search}%` },
                    };
                } else {
                    return {
                        [field]: { [Op.like]: `%${search}%` },
                    };
                }
            });

            whereObject = {
                [Op.or]: [options.baseWhere, ...defaultFieldsFilter]
            };
        }
          

        try {
            const totalRecords = await this.model.count();
            const result = await this.model.findAll({
                attributes: options.attributes || null,
                include: options.include || [],                
                ...sortObject,
                where: whereObject,
                ...limitObject,
            });

            return {
                data: result,
                total: totalRecords,
            };
        } catch (error) {
            console.error('Pagination Error:', error.message);
            throw new Error('Error during pagination');
        }
    }

    async update(id, changes) {
        try {
            const model = await this.findOne(id);
            if (!model) {
                throw new Error(`Instance with id ${id} not found`);
            }
            const instance = await model.update(changes);
            return instance;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    async delete(id) {
        try {
            const model = await this.findOne(id);
            if (!model) {
                throw new Error(`Instance with id ${id} not found`);
            }
            await model.destroy();
            return true;
        } catch (error) {
            this.handleDatabaseError(error);
        }
    }

    handleDatabaseError(error) {
        console.error('Database operation failed:', error.message);
        throw new Error('Internal server error');
    }
}

module.exports = BaseService;