const knex = require('knex');

class Container {
    constructor(configdb, table) {
        this.configdb = knex(configdb);
        this.table = table
    }

    async getAll() {
        try {
            const content = await this.configdb.from(this.table).select('*')
            return content;
            
        } catch (error) {
            console.error('ERROR: ', error); throw error;
        }
    }

    async getById(id) {
        try {
            const content = await this.configdb.from(this.table).select('*').where('id', '=', id);

            if (content.length === 0) {
                return ({ ERROR: 'Producto no encontrado' });
            }

            return content;

        } catch (error) {
            console.error('ERROR: ', error); throw error;
        }
    }

    async save(element) {
        try {
            const content = await this.configdb(this.table).insert(element)
            return content.id;

        } catch (error) {
            console.error('ERROR: ', error); throw error;
        }
    }

    async update(id, element) {
        try {
            const content = await this.configdb.from(this.table).where('id', '=', id).update(element)

            if (!content) {
                return { ERROR: 'No encontrado' };
            };

            return element;

        } catch (error) {
            console.error('ERROR: ', error); throw error;
        }
    }

    async deleteById(id) {
        try {
            const content = await this.configdb.from(this.table).where('id', '=', id).del()

            if (!content) {
                return { ERROR: 'No encontrado' };
            };

            return content;

        } catch (error) {
            console.error('ERROR: ', error); throw error;
        }
    }
}

module.exports = Container;