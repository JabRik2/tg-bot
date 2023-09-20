import json

import requests
from flask import Flask, request
from flask_cors import CORS
from aiogram import Bot, Dispatcher, types
from aiogram.types import Update, PreCheckoutQuery, Message, ContentType, InlineKeyboardButton, InlineKeyboardMarkup
import logging
from db import DatabaseManager

# Инициализация Flask приложения
app = Flask(__name__)
CORS(app)

# Инициализация бота и диспетчера
bot = Bot(token='6655338084:AAGjpfRsKbejABHrV7EMIjadFydTQrfB7k4')
dp = Dispatcher(bot)
db = DatabaseManager("BackAPI.db")
db.create_tables()

PRICE = types.LabeledPrice(label="Подписка на 1 месяц", amount=500 * 100)


# Обработка входящих обновлений
@app.route('/webhook', methods=['POST'])
async def webhook_handler():
    # update = Update.as_json(request.get_json())
    # await dp.process_updates([update])
    bot_token = '6418207197:AAFkrwZJ4d0srqWB-p5T1VJNMXbYzW779u4'
    json_file = request.json
    # Замените 'USER_CHAT_ID' на chat_id пользователя, которому вы хотите отправить счет
    chat_id = json_file['userId']

    # URL для отправки запроса к Telegram Bot API
    url = f'https://api.telegram.org/bot{bot_token}/sendInvoice'

    # Параметры счета
    invoice_payload = 'custom_data'  # Дополнительные данные (по желанию)
    provider_token = '381764678:TEST:66716'  # Токен платежного провайдера
    start_parameter = 'payment'
    title = 'Покупка в DodoSeller'
    count = 0
    description = 'Покупка товаров'
    # for i in json_file['cart']:
    #     description += i
    for i in json_file['cart']:
        count += json_file["cart"][i]["count"] * json_file["cart"][i]["price"]

    # description += f'Общая стоимость: {count}'
    currency = 'RUB'
    prices = [{'label': 'Покупка в DodoSeller', 'amount': count * 100}]  # Сумма в копейках (например, 10000 копеек = 100 рублей)
    photo = open('photo.jpg', 'rb')
    # Создание параметров запроса
    data = {
        'chat_id': chat_id,
        'title': title,
        'description': description,
        'payload': invoice_payload,
        'provider_token': provider_token,
        'start_parameter': start_parameter,
        'currency': currency,
        'prices': prices,
        'photo_url': 'https://i.mycdn.me/i?r=AyH4iRPQ2q0otWIFepML2LxRXCfAO_dnvQ-frleoOz-t-Q',
        'photo_width': 700,
        'photo_height': 400,
    }

    # Отправка запроса к Telegram Bot API
    response = requests.post(url, json=data)
    try:
        # print(update)
        print(request.json)
    except Exception:
        print(Exception)

    return 'ok'


@app.route('/category', methods=['GET'])
async def get_category():
    category = db.fetchall('select * from Category')
    json_category = []
    for i in category:
        dict_category = {
            "id": i[0],
            "name": i[1],
            "image": i[2],
            "label": i[3]
        }
        json_category.append(dict_category)
    return json_category


@app.route('/product', methods=['GET'])
async def get_product():
    products = db.fetchall('select * from Product')
    json_product = []
    for i in products:
        dict_product = {
            "id": i[0],
            "category": i[1],
            "name": i[2],
            "image": i[3],
            "price": i[4],
            "descr": i[5]
        }
        json_product.append(dict_product)
    return json_product

@app.route('/id_product/<int:id>', methods=['GET'])
def get_id_product(id):
    products = db.fetchone('select * from Product where id=?', (int(id), ))
    dict_product = {
        "id": products[0],
        "category": products[1],
        "name": products[2],
        "image": products[3],
        "price": products[4],
        "descr": products[5]
    }
    return dict_product


@app.route('/user_cart', methods=['POST'])
def cart():

    data = request.json
    print(data)
    id_name = data['userId']
    there_user = db.fetchone('select * from User where id_name=?', (id_name, ))

    if there_user:
        json_data = json.dumps(data['cart'])
        db.query('update User set cart=? where id_name=?', (json_data, id_name,))

    else:
        json_data = json.dumps(data['cart'])
        db.query('insert into User (id_name, cart) values (?, ?)', (id_name, json_data, ))

    return data


@app.route('/id_name/<int:id>', methods=['GET'])
def get_user_cart(id):
    cart = db.fetchone('select * from User where id_name=?', (str(id), ))
    data = json.loads(cart[1])
    json_file = []
    my_dict = {
        "id": cart[0],
        "cart": data
    }

    return my_dict



if __name__ == '__main__':
    app.run(host='localhost', port=8000)
