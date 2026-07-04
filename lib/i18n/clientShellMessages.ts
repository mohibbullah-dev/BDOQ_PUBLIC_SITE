/**
 * Strips heavy translation namespaces before sending to the root client provider.
 * Full messages stay on the server; page-specific keys hydrate via nested providers.
 */
type MessageTree = Record<string, unknown>;

const SHELL_STRIP_KEYS = [
  "courseDetails",
  "home",
  "forms",
  "pages",
  "content",
  "welcome",
] as const;

function pickKeys(messages: MessageTree, keys: readonly string[]): MessageTree {
  return Object.fromEntries(
    keys
      .filter((key) => messages[key] !== undefined)
      .map((key) => [key, messages[key]])
  );
}

function pickNestedPage(
  messages: MessageTree,
  pageKey: string
): MessageTree | undefined {
  const pages = messages.pages as Record<string, unknown> | undefined;
  if (!pages?.[pageKey]) return undefined;
  return { [pageKey]: pages[pageKey] };
}

function pickNestedPages(
  messages: MessageTree,
  pageKeys: readonly string[]
): MessageTree {
  const pages = messages.pages as Record<string, unknown> | undefined;
  if (!pages) return {};

  return Object.fromEntries(
    pageKeys
      .filter((key) => pages[key] !== undefined)
      .map((key) => [key, pages[key]])
  );
}

function pickContentSections(
  messages: MessageTree,
  sections: readonly string[]
): MessageTree | undefined {
  const content = messages.content as Record<string, unknown> | undefined;
  if (!content) return undefined;

  return Object.fromEntries(
    sections
      .filter((section) => content[section] !== undefined)
      .map((section) => [section, content[section]])
  );
}

export function getClientShellMessages(messages: MessageTree): MessageTree {
  return pickKeys(
    messages,
    Object.keys(messages).filter(
      (key) =>
        !SHELL_STRIP_KEYS.includes(key as (typeof SHELL_STRIP_KEYS)[number])
    )
  );
}

export function getCourseDetailClientMessages(
  messages: MessageTree
): MessageTree {
  return pickKeys(messages, ["courseDetails"]);
}

export function getHomeClientMessages(messages: MessageTree): MessageTree {
  return pickKeys(messages, ["home", "welcome", "cta", "stats", "academy"]);
}

export function getFormClientMessages(
  messages: MessageTree,
  pageKey: "freeClass" | "studentAdmission" | "teacherRegistration"
): MessageTree {
  const pageSlice = pickNestedPage(messages, pageKey);
  return {
    forms: messages.forms,
    ...(pageSlice ? { pages: pageSlice } : {}),
  };
}

export function getContactClientMessages(messages: MessageTree): MessageTree {
  return {
    pages: pickNestedPages(messages, ["contact"]),
  };
}

export function getAboutClientMessages(messages: MessageTree): MessageTree {
  const contentAbout = pickContentSections(messages, ["about"]);
  return {
    ...pickKeys(messages, ["home"]),
    pages: pickNestedPages(messages, ["about"]),
    ...(contentAbout ? { content: contentAbout } : {}),
  };
}

export function getPricingClientMessages(messages: MessageTree): MessageTree {
  const contentPricing = pickContentSections(messages, ["pricing"]);
  return {
    pages: pickNestedPages(messages, ["pricing"]),
    ...(contentPricing ? { content: contentPricing } : {}),
  };
}

export function getTeachersClientMessages(messages: MessageTree): MessageTree {
  return {
    pages: pickNestedPages(messages, ["teachers"]),
  };
}

export function getReviewsClientMessages(messages: MessageTree): MessageTree {
  return {
    pages: pickNestedPages(messages, ["reviews"]),
  };
}

export function getResourcesClientMessages(messages: MessageTree): MessageTree {
  const contentResources = pickContentSections(messages, [
    "resources",
    "ebooks",
  ]);
  return {
    pages: pickNestedPages(messages, ["resources"]),
    ...(contentResources ? { content: contentResources } : {}),
  };
}

export function getBlogClientMessages(messages: MessageTree): MessageTree {
  const content = messages.content as MessageTree | undefined;
  const blog = content?.blog as MessageTree | undefined;
  if (!blog) return { content: { blog: {} } };

  const posts = blog.posts as Record<string, MessageTree> | undefined;

  return {
    content: {
      blog: {
        ...blog,
        posts: posts
          ? Object.fromEntries(
              Object.entries(posts).map(([slug, post]) => [
                slug,
                {
                  title: post.title,
                  excerpt: post.excerpt,
                  tags: post.tags,
                },
              ])
            )
          : posts,
      },
    },
  };
}

export function getGalleryClientMessages(messages: MessageTree): MessageTree {
  const contentGallery = pickContentSections(messages, ["gallery"]);
  return {
    pages: pickNestedPages(messages, ["gallery"]),
    ...(contentGallery ? { content: contentGallery } : {}),
  };
}

export function getCoursesListClientMessages(
  messages: MessageTree
): MessageTree {
  const contentCourses = pickContentSections(messages, ["courses"]);
  return {
    pages: pickNestedPages(messages, ["courses"]),
    ...(contentCourses ? { content: contentCourses } : {}),
  };
}
