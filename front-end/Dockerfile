FROM node:22

RUN npm install -g pnpm@9.2.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "run", "dev"]
