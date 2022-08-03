import requests
import re


def run(url):
    headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
    }  # Задаем User-Agent-a чтоб не палиться

    try:  # Попробуем сделать запрос
        page = requests.get(url, headers=headers)
    except:  # Если не получилось сделать запрос тогда
        url = "http://" + url  # добавляем начала ссылки "http://"
        page = requests.get(url, headers=headers)  # Снова попробуем отправить запрос
    page = str(page.text)
    emails = re.findall('\w+\@\w+.\w+', page)  # Ищем e-mail адреса
    for i in range(len(emails)):  # Запускаем цикл for в списке email
        if emails[i] in database:  # Если e-mail адрес есть в базе данных тогда
            pass  # ничего))
        else:  # В противном случай
            email.insert(END, emails[i] + '\n')  # Добавляем в текстовое поле
            database.append(emails[i])  # Добавляем в базу данных


