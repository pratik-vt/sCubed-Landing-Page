import React from 'react';

import { SitemapColumn } from '@/app/sitemap/page';

import * as styles from './styles.css';

interface SitemapListProps {
  columns: SitemapColumn[];
  baseUrl: string;
}

const SitemapList: React.FC<SitemapListProps> = ({ columns, baseUrl }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.pageTitle}>S Cubed Site Map</h1>

        <div className={styles.columnsGrid}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className={styles.column}>
              {column.sections.map((section) => (
                <div key={section.title} className={styles.section}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <ul className={styles.linkList}>
                    {section.links.map((link) => (
                      <li key={link.url} className={styles.linkItem}>
                        <a
                          href={`${baseUrl}${link.url}`}
                          className={styles.link}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitemapList;