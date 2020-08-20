# Babel Plugin Next Optional Server

Remove any code in Next.js applications that prevents a fully static `next export`, in order to support multiple build target.

Currently, this means removing `getServerSideProps` from pages.

See [this issue for the rational behind this package](https://github.com/vercel/next.js/issues/15674).
