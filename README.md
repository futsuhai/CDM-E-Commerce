Проект интернет-магагазина продуктов "Северяночка"
Основные функции:
1. Аутентификация и Авторизация (ready)
   - Возможность регистрации и входа для пользователей.
   - Управление заказами и персональными данными через личный кабинет.
2. Отображение Продуктов (ready)
   - Отображение каталога продуктов с детальной информацией о каждом продукте.
   - Интуитивно понятный пользовательский интерфейс для удобного поиска и навигации по продуктам.
3. Страница Продукта (ready)
   - Подробная страница для каждого продукта с изображениями, описанием и другой важной информацией.
4. Корзина (ready)
   - Возможность делать заказы продуктов
6. Админка (ready)
   - Возможность производить администрирование продуктов и заказов

Frontend

1. Перейти в терминал e-commerce-frontend и выполнить npm install
2. Перейти в терминал e-commerce-frontend и выполнить ng serve
3. Eslint запускается командой npm run lint
4. Чтобы запустить тесты использовать команду ng tests

Backend

**Не успел сделать миграцию, чтобы запустить сервер нужно удалить коллекцию E-Commerce
*Инициализация бд происходит в классе DatabaseInitializer

1. Перейти в терминал e-commerce-backend и выполнить dotnet build
2. Перейти в терминал e-commerce-backend и выполнить dotnet run
3. Если сервер падает при сборке с ошбикой Sysetem.TimeoutExeption, то значит порт 27017, кто-то использует.(Решение: ребут компа или kill процесс :))



