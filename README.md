# WorkoutAI

Seu assistente pessoal de treinos com Inteligência Artificial.

## 🔗 Repositório
Você pode encontrar o código fonte deste projeto em: [SEU_LINK_DO_GITHUB_AQUI]

## 🚀 Funcionalidades Implementadas
- **IA Generativa:** Geração de planos de treino personalizados baseados em objetivos e equipamentos (Genkit + Gemini).
- **Busca Inteligente:** Substituição de exercícios clicando no nome, acessando a base de dados do sistema.
- **Edição em Massa:** Ajuste de séries, repetições e intervalos com opção de aplicar a todos os exercícios do treino simultaneamente via checkbox.
- **Layout Full Width:** Visualização expandida para Desktop (aproveitando 100% da largura) e responsividade otimizada para Mobile (720px max).
- **Gestão de Séries:** Identificação automática de séries de Aquecimento, Preparatórias e Válidas, ocultando tipos com contagem zero.
- **Combinações Avançadas:** Suporte para Biset, Triset, Supersérie e HIIT com configurações específicas.

## 🛠 Tecnologias
- Next.js 15 (App Router)
- React 19
- Tailwind CSS & Shadcn UI
- Genkit (IA)
- Lucide React Icons
- Recharts (Métricas de Treino)

## 💻 Como rodar localmente
1. Instale as dependências: `npm install`
2. Configure seu `.env` com a `GEMINI_API_KEY`.
3. Rode o servidor de desenvolvimento: `npm run dev`

## ⌨️ Comandos Git Úteis

### Comandos do dia a dia
- `git add .`: Adiciona todas as mudanças.
- `git commit -m "mensagem"`: Cria um ponto de salvamento.
- `git push origin main`: Envia para o GitHub.

### Como limpar e recomeçar o repositório (Reset)
Se você deseja apagar todo o histórico e subir o projeto como se fosse a primeira vez:
1. **Remover pasta Git**: `rm -rf .git` (Mac/Linux) ou `rd /s /q .git` (Windows)
2. **Iniciar novo Git**: `git init`
3. **Adicionar tudo**: `git add .`
4. **Primeiro Commit**: `git commit -m "Initial commit"`
5. **Linkar Remoto**: `git remote add origin [LINK_DO_REPOSITORIO]`
6. **Push Forçado**: `git push -u -f origin main`
