import sqlite3


class DatabaseManager(object):

    def __init__(self, path):
        self.conn = sqlite3.connect(path, check_same_thread=False)
        self.conn.execute('pragma foreign_keys = on')
        self.conn.commit()
        self.cur = self.conn.cursor()

    def create_tables(self):
        self.query('CREATE TABLE IF NOT EXISTS User (id_name text, cart text)')
        self.query('CREATE TABLE IF NOT EXISTS Category (id int, name text, image text, lable text)')
        self.query('CREATE TABLE IF NOT EXISTS Product (id int, category int, name text, image text, price int, descr text)')


    def query(self, arg, values=None):
        if values == None:
            self.cur.execute(arg)
        else:
            self.cur.execute(arg, values)
        self.conn.commit()

    def fetchone(self, arg, values=None):
        if values == None:
            self.cur.execute(arg)
        else:
            self.cur.execute(arg, values)
        return self.cur.fetchone()

    def fetchall(self, arg, values=None):
        if values == None:
            self.cur.execute(arg)
        else:
            self.cur.execute(arg, values)
        return self.cur.fetchall()

    def __del__(self):
        self.conn.close()