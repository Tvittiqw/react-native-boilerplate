type UsersInfo = {
    email: string
    password: string
}

class FakeDB {
    data: Array<UsersInfo> = [{ email: "filipovich.igor1999@gmail.com", password: "12345678Q@" }]

    async addUser(user: UsersInfo): Promise<string> {
        if (this.data.length) {
            const findUser = this.data.find((us) =>
                us.email === user.email && us.password === us.password);
            return new Promise( async (resolve, reject) => {
                if (!findUser) {
                    this.data.push(user)
                    const token = await this.checkUser(user)
                    resolve(token)
                } else {
                    setTimeout(() => {
                        reject(new Error("Already exist"))
                    }, 1000);
                }
            });
        } else {
            this.data.push(user)
            const token = await this.checkUser(user)
            return Promise.resolve(token);
        }
    }

    checkUser(user: UsersInfo): Promise<string> {
        if (this.data.length) {
            const findUser = this.data.find((us) =>
                us.email === user.email && us.password === us.password)
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (findUser) {
                        resolve(findUser.email)
                    } else {
                        reject(new Error("Not found"))
                    }
                }, 1000);
            })
        } else {
            return Promise.reject(new Error("No users in DB"))
        }
    }
}

const fakeDB = new FakeDB();

export default fakeDB;