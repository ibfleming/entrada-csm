FROM node:22.13.1-alpine3.21

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

ENV PROJ_ENV=production

ARG DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
ENV DATABASE_URL=${DATABASE_URL:-postgresql://username:password@localhost:5432/mydatabase}

ARG PORT=8080
ENV PORT=${PORT:-8080}

ARG ORIGIN=http://localhost:${PORT}
ENV ORIGIN=${ORIGIN:-http://localhost:${PORT}}

RUN pnpm run build
RUN pnpm prune --prod

EXPOSE ${PORT}

CMD ["node", "build"]
