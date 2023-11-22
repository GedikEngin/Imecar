import psycopg2 as pg2

secret='root'
conn = pg2.connect(database='dvdrental', user='postgres', password=secret) # links to database specified and creates connecetion
cur = conn.cursor() # creates a pointer/searching tool that is connected to the database

try:
    cur.execute('SELECT * FROM payment') # how you execute queries
    data = cur.fetchall()
    # fetches all rows after query execution

    data = cur.fetchone()
    # fetches first row after query execution

    data = cur.fetchmany(10)
    # fetches first 10 items from query execution

    print(data)
except:
    print('error')

# fetching column names
cur.execute('SELECT * FROM payment')
column_names = [desc[0] for desc in cur.description] 
for i in column_names: 
    print(i) 

cur.close() # shuts cursor down to prevent corruption or bad state of data
conn.close() # shuts the connection to db to prevent corruption or bad state of data