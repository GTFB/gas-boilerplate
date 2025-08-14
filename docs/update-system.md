# Update System - How It Works

## 🔍 How the System Detects Updates

### 1. **Repository Connection Check**
```javascript
// Check if project is connected to gas-boilerplate
const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();

if (!remoteUrl.includes('gas-boilerplate')) {
  logger.warn('UPDATE_WARNING', 'This project is not connected to gas-boilerplate repository');
  return false;
}
```

**Что происходит:**
- Система проверяет URL удаленного репозитория
- Должен содержать `gas-boilerplate` в названии
- Если нет - обновления невозможны

### 2. **Commit Hash Comparison**
```javascript
// Get local and remote commit hashes
const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
const remoteCommit = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();

if (localCommit === remoteCommit) {
  logger.info('UPDATE_INFO', 'Already up to date with gas-boilerplate');
  return false;
}
```

**Что происходит:**
- Сравнивает локальный commit с удаленным
- Если одинаковые - обновлений нет
- Если разные - есть обновления

### 3. **Change Detection**
```javascript
// Get commit messages since last update
const commits = execSync(`git log ${localCommit}..origin/main --oneline`, { encoding: 'utf8' });

logger.info('UPDATE_AVAILABLE', `Found updates in gas-boilerplate:`);
console.log(commits);
```

**Что происходит:**
- Показывает все коммиты с момента последнего обновления
- Пользователь видит, что именно изменилось

## 🔄 Update Process Flow

### **Step 1: Check for Updates**
```bash
make update
# or
node utils/version-updater.js check
```

**Результат:**
- ✅ "Already up to date" - обновлений нет
- ⚠️ "Found updates" - есть обновления
- ❌ "Not connected" - нет связи с gas-boilerplate

### **Step 2: Apply Updates**
```bash
make upgrade
# or
node utils/version-updater.js update
```

**Что происходит автоматически:**
1. **Stash локальных изменений** - сохраняет вашу работу
2. **Pull изменений** - скачивает обновления
3. **npm install** - обновляет зависимости
4. **Валидация** - проверяет систему
5. **Restore изменений** - возвращает вашу работу

## 🧠 Smart Update Logic

### **Automatic Stashing**
```javascript
// Check for local changes
const hasChanges = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
let stashed = false;

if (hasChanges) {
  logger.info('UPDATE_STASH', 'Stashing local changes...');
  execSync('git stash push -m "Auto-stash before update"', { stdio: 'inherit' });
  stashed = true;
}
```

**Зачем это нужно:**
- Сохраняет ваши локальные изменения
- Позволяет обновляться без потери работы
- Автоматически восстанавливает после обновления

### **Conflict Resolution**
```javascript
// Restore stashed changes if any
if (stashed) {
  logger.info('UPDATE_RESTORE', 'Restoring stashed changes...');
  try {
    execSync('git stash pop', { stdio: 'inherit' });
  } catch (stashError) {
    logger.warn('UPDATE_STASH_WARNING', 'Failed to restore stashed changes, manual merge required');
  }
}
```

**Что происходит:**
- Пытается автоматически восстановить изменения
- Если конфликты - требует ручного разрешения
- Логирует все действия

## 📊 Update Logging

### **Automatic Log Creation**
```javascript
createUpdateLog(newVersion) {
  const updateEntry = `## ${newVersion} - ${timestamp}
- Updated from ${this.currentVersion}
- Source: gas-boilerplate
- Status: Success
`;
  
  fs.writeFileSync(updateLogPath, updateEntry + existingContent);
}
```

**Что записывается:**
- Версия до и после обновления
- Время обновления
- Источник (gas-boilerplate)
- Статус операции

## 🔧 Manual Override Options

### **Force Update (ignores local changes)**
```bash
git fetch origin
git reset --hard origin/main
npm install
```

### **Check What Changed**
```bash
git log HEAD..origin/main --oneline
```

### **Manual Stash Management**
```bash
git stash list          # посмотреть stash
git stash pop           # применить stash
git stash drop          # удалить stash
```

## 🚨 Troubleshooting Updates

### **Update Fails**
```bash
# Check git status
git status

# Check remote connection
git remote -v

# Manual update
git fetch origin
git pull origin main
npm install
```

### **Conflicts After Update**
```bash
# Check stashed changes
git stash list

# Apply stashed changes
git stash pop

# Resolve conflicts manually if needed
```

### **Not Connected to gas-boilerplate**
```bash
# Check remote URL
git remote get-url origin

# Should contain: gas-boilerplate
# If not, update system manually or re-clone
```

## 📋 Update Workflow Summary

```
1. make update          ← Проверить обновления
   ↓
2. make upgrade         ← Применить обновления
   ↓
3. Автоматический stash ← Сохранить локальные изменения
   ↓
4. git pull origin main ← Скачать обновления
   ↓
5. npm install          ← Обновить зависимости
   ↓
6. make validate        ← Проверить систему
   ↓
7. Автоматический restore ← Вернуть локальные изменения
   ↓
8. Продолжить работу    ← Ваш проект обновлен!
```

## 🎯 Key Benefits

- ✅ **Автоматическое обнаружение** обновлений
- ✅ **Безопасное обновление** без потери работы
- ✅ **Умное stashing** локальных изменений
- ✅ **Автоматическое разрешение** конфликтов
- ✅ **Подробное логирование** всех операций
- ✅ **Валидация системы** после обновления
- ✅ **Управление зависимостями** через npm

## 🔍 How It Knows What to Update

Система **НЕ анализирует содержимое** материнского репозитория. Она работает на уровне Git:

1. **Сравнивает commit hashes** - есть ли новые коммиты
2. **Показывает commit messages** - что именно изменилось
3. **Применяет все изменения** - полное обновление
4. **Сохраняет локальные изменения** - ваша работа не теряется

Это **Git-based подход**, который гарантирует, что ваш проект всегда будет точно соответствовать материнскому репозиторию gas-boilerplate.
