const knex = require('knex');

class Container {
    constructor(configdb, table) {
        this.configdb = knex(configdb);
        this.table = table
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            return list;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async getById(id) {
        try {
            const data = await this.configdb.from(this.table).select('*').where('id', '=', id);
            
            if(data.length === 0){
                return null;
            }
            
            return data;

        } catch (error) {
            console.error('Error: ', error); throw error;
        }
    }

    async save(element) {
        try {
            const data = await this.configdb(this.table).insert(element)
            return data.id;

        } catch (error) {
            console.error('Error: ', error); throw error;
        }
    }

    async update(id, elemento) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8')
            const list = JSON.parse(content);
            const element = list.find(e => e.id === id);
            const indexOfElement = list.findIndex(e => e.id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            const updatedList = {
                ...element,
                ...elemento
            }

            list[indexOfElement] = updatedList;

            const listString = JSON.stringify(list, null, 2);
            await fs.promises.writeFile(`${this.file}`, listString);

            return updatedList;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(`${this.file}`, 'utf-8');
            const list = JSON.parse(content);
            const element = list.find(e => e.id === id);
            const indexOfElement = list.findIndex(e => e.id === id);

            if (!element) {
                return { error: 'No encontrado' };
            };

            list.splice(indexOfElement, 1);
            const listString = JSON.stringify(list, null, 2);

            await fs.promises.writeFile(`${this.file}`, listString);
            return list;

        } catch (error) {
            console.error('Error: ', error);
        }
    }
}

module.exports = Container;