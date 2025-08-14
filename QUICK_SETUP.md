# 🚀 Быстрая настройка репозиториев

## Проблема
Ваш `origin` настроен на `gas-boilerplate`, поэтому `git push` отправляет изменения туда.

## Решение за 2 команды

### 1. Настройка репозиториев
```bash
# Если у вас уже есть репозиторий ayva на GitHub
make setup-repos https://github.com/your-username/ayva.git

# Если репозитория ayva еще нет
make setup-repos
```

### 2. Проверка подключения
```bash
make test-repos
```

## Что произойдет автоматически

✅ **origin** переименуется в **upstream** (для gas-boilerplate)  
✅ **origin** настроится на ваш репозиторий ayva  
✅ Система проверит все подключения  

## После настройки

### Получение обновлений от gas-boilerplate
```bash
make update    # проверить обновления
make upgrade   # применить обновления
```

### Отправка изменений в ayva
```bash
git add .
git commit -m "Your changes"
git push origin main
```

## Если что-то пошло не так

```bash
# Проверить текущие настройки
git remote -v

# Проверить логи
make logs

# Проверить конфигурацию
make config
```

## Нужна помощь?

Смотрите подробную документацию: `docs/repository-setup.md`
