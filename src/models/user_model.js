var cn = require("../config/database");

class userModel {
    constructor(chats){
        this.tableName = 'users';
    }
    executeQuery(query, params) {
        return new Promise((resolve, reject) => {
            cn.query(query, params, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
 
    async findAll() {
        const query = `SELECT * FROM ${this.tableName}`;
        const results = await this.executeQuery(query);
        return results;
    }

    async findById(id) {
        const query = `SELECT * FROM ${this.tableName} WHERE user_id = ?`;
        const results = await this.executeQuery(query, [id]);
        return results[0];
    }

    async create(data) {
        const query = `INSERT INTO ${this.tableName} SET ?`;
        const result = await this.executeQuery(query, data);
        return result.insertId;
    }

    async update(id, data) {
        const query = `UPDATE ${this.tableName} SET ? WHERE user_id = ?`;
        const result = await this.executeQuery(query, [data, id]);
        return result.affectedRows;
    }
    
    async delete(id) {
        const query = `DELETE FROM ${this.tableName} WHERE user_id = ?`;
        const result = await this.executeQuery(query, [id]);
        return result.affectedRows;
    }  
    
    async callChatProcedure(params) {
        const query = `SELECT * FROM ${this.tableName} WHERE user_id = 1`;
        // const query = 'CALL sp_chat_return(?,?)';
        const results = await this.executeQuery(query, params);
        return results[0];
    }    

    async findByFlag(flag) {
        const query = `SELECT * FROM ${this.tableName} WHERE user_flag = ?`;
        const results = await this.executeQuery(query, [flag]);
        return results[0];
    }    
}

module.exports = userModel;