# jpgtopdf
Renders directories of .jpg files to .pdf files.

Given the following file structure:

```

└── input
    ├── c001
    |   ├── p001.jpg
    |   ├── p002.jpg
    |   ├── p003.jpg
    |   └── p004.jpg
    └── c002
        ├── p001.jpg
        ├── p002.jpg
        ├── p003.jpg
        ├── p004.jpg
        └── p005.jpg
```

You'll be given the .pdf files:
```
└── output
    ├── c001.pdf // 4 pages
    └── c002.pdf // 5 pages
```


# Running

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.27. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
