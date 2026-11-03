# blogfolio

Personal blog and portfolio built with Astro and Tailwind CSS, hosted on
GitHub Pages at <https://maik-hasler.de>.

- Development: `npm install`, then `npm run dev`
- Design: see [docs/design.md](docs/design.md)

## Deployment

Pushes to `main` run `.github/workflows/deploy.yaml`, which builds the site
(`npm run build`) and deploys `dist/` via the official GitHub Pages actions.
In the repository settings, set **Pages → Source** to **GitHub Actions** and the
custom domain to `maik-hasler.de`. `public/CNAME` keeps the domain in the build.

## DNS

At your domain registrar:

| Type    | Name  | Value                   |
| ------- | ----- | ----------------------- |
| `A`     | `@`   | `185.199.108.153`       |
| `A`     | `@`   | `185.199.109.153`       |
| `A`     | `@`   | `185.199.110.153`       |
| `A`     | `@`   | `185.199.111.153`       |
| `CNAME` | `www` | `maik-hasler.github.io` |

Once DNS is correct, GitHub provisions and renews the TLS certificate
automatically (enable **Enforce HTTPS** in the Pages settings).
