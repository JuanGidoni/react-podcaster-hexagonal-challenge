/**
 * Scaffolds the initial feature/page folder structure for the Podcaster app.
 * Run from the project root: `node scripts/scaffold-structure.js`
 */

const fs = require("fs");
const path = require("path");

const base = path.resolve("src/features");

const structure = {
  catalog: {
    ui: {
      pages: {
        HomePage: [
          "HomePage.tsx",
          "HomePage.css",
          "HomePage.test.tsx",
          "types.ts",
          "mockPodcasts.ts",
        ],
        PodcastDetailPage: [
          "PodcastDetailPage.tsx",
          "PodcastDetailPage.css",
          "PodcastDetailPage.test.tsx",
          "types.ts",
        ],
        EpisodeDetailPage: [
          "EpisodeDetailPage.tsx",
          "EpisodeDetailPage.css",
          "EpisodeDetailPage.test.tsx",
          "types.ts",
        ],
      },
      components: {
        PodcastCard: [
          "PodcastCard.tsx",
          "PodcastCard.css",
          "PodcastCard.test.tsx",
          "types.ts",
        ],
        EpisodeCard: [
          "EpisodeCard.tsx",
          "EpisodeCard.css",
          "EpisodeCard.test.tsx",
          "types.ts",
        ],
      },
    },
    domain: {
      entities: ["Podcast.ts", "Episode.ts"],
      valueObjects: ["PodcastId.ts", "EpisodeId.ts"],
      ports: ["PodcastRepository.ts"],
    },
    application: {
      useCases: [
        "GetTop100Podcasts.ts",
        "GetPodcastDetail.ts",
        "GetPodcastEpisodes.ts",
      ],
      services: [],
    },
    infra: {
      adapters: ["RestPodcastRepository.ts", "InMemoryPodcastRepository.ts"],
      mappers: ["podcastMapper.ts"],
    },
  },
};

function createStructure(basePath, obj) {
  for (const [key, value] of Object.entries(obj)) {
    const target = path.join(basePath, key);
    if (Array.isArray(value)) {
      if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });
      value.forEach((file) => {
        const filePath = path.join(basePath, key, file);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, `// ${filePath}\n\n`);
      });
    } else {
      fs.mkdirSync(target, { recursive: true });
      createStructure(target, value);
    }
  }
}

createStructure(base, structure);
console.log("✅ Folder structure created successfully under src/features/");
