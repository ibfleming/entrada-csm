FROM node:22.13.1-alpine3.21

WORKDIR /app

RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

ENV PORT=3030
ENV PROJ_ENV=production
ENV DATABASE_URL=postgres://ian:FatherSonHolySpirit@76.178.137.56:3306/dev
ENV ORIGIN=http://localhost:3030

RUN pnpm run build
RUN pnpm prune --prod

EXPOSE 3030

CMD ["node", "build"]