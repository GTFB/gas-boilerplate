# Repository Setup Guide

Этот документ описывает, как автоматически настроить репозитории для работы с gas-boilerplate.

## Проблема

По умолчанию ваш проект настроен так, что `origin` указывает на `gas-boilerplate`. Это означает, что:
- `git push` отправляет изменения в gas-boilerplate (что не нужно)
- `git pull` получает обновления от gas-boilerplate (это нужно)

## Решение

Настроить два репозитория:
- **upstream** → gas-boilerplate (для получения обновлений)
- **origin** → ayva (ваш репозиторий для push)

## Автоматическая настройка

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

### 3. Ручная настройка (если автоматическая не сработала)

```bash
# Переименовать origin в upstream
git remote rename origin upstream

# Добавить новый origin для ayva
git remote add origin https://github.com/your-username/ayva.git

# Проверить настройку
git remote -v
```

## Использование после настройки

### Получение обновлений от gas-boilerplate

```bash
# Проверить наличие обновлений
make update

# Применить обновления
make upgrade

# Или вручную
git pull upstream main
```

### Отправка изменений в ayva

```bash
# Добавить изменения
git add .

# Сделать коммит
git commit -m "Your commit message"

# Отправить в ayva
git push origin main
```

## Команды

| Команда | Описание |
|---------|----------|
| `make setup-repos [url]` | Настроить репозитории |
| `make test-repos` | Проверить подключения |
| `make update` | Проверить обновления |
| `make upgrade` | Применить обновления |

## Структура репозиториев

```
upstream (gas-boilerplate)
    ↓ (получение обновлений)
your local repository
    ↓ (отправка изменений)
origin (ayva)
```

## Устранение неполадок

### Ошибка "upstream not configured"

```bash
# Добавить upstream вручную
git remote add upstream https://github.com/username/gas-boilerplate.git
```

### Ошибка "origin not configured"

```bash
# Добавить origin для ayva
git remote add origin https://github.com/your-username/ayva.git
```

### Проверка текущих настроек

```bash
git remote -v
```

## Логи

Все операции логируются в папку `logs/`. Проверьте логи для диагностики проблем:

```bash
make logs
```

## Поддержка

Если у вас возникли проблемы:
1. Проверьте логи: `make logs`
2. Проверьте подключения: `make test-repos`
3. Проверьте конфигурацию: `make config`
