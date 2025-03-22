// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Auth Module Documentation',
  tagline: 'Documentation for the Authentication Module',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://auth-module.lautaroayosa.com.ar/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/documentation/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Lautaro Ayosa', // Usually your GitHub org/user name.
  projectName: 'AuthModule', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LautaroAyosa/auth-module',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/LautaroAyosa/auth-module_documentation',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '',
        logo: {
          alt: 'Auth Module Documentation',
          src: 'img/logo_min.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'sidebar',
            position: 'left',
            label: 'Documentation',
          },
          
          {
            href: 'https://github.com/lautaroayosa',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Setup',
                to: '/docs/intro',
              },
              {
                label: 'Api',
                to: '/docs/intro',
              },
              {
                label: 'Frontend',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/s9a66Ytb',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'AuthModule Blog',
                to: '/blog',
              },
              {
                label: 'Personal Blog',
                to: 'https://lautaroayosa.com.ar/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/LautaroAyosa/AuthModule',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Lautaro Ayosa - AuthModule. <br/> <p style="font-size:11px">Docs built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a></p>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;