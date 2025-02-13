FROM node:22.13.1-alpine3.21

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

ENV PROJ_ENV=production

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG PORT 
ENV PORT=${PORT}

ARG ORIGIN
ENV ORIGIN=${ORIGIN}

RUN pnpm run build
RUN pnpm prune --prod

EXPOSE ${PORT}

CMD ["node", "build"]