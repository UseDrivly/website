'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { CMSPage, CMSPageWithSections } from '@/types';

export default function ContentManagementPage() {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<CMSPageWithSections | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages');
      const data = await res.json();
      setPages(data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPageContent = async (pageId: string) => {
    try {
      const res = await fetch(`/api/cms/sections?page_id=${pageId}`);
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error fetching page content:', errorData);
        alert(`Error: ${errorData.error || 'Failed to fetch page content'}`);
        return;
      }
      const data = await res.json();
      const page = pages.find(p => p.id === pageId);
      if (page) {
        setSelectedPage({ ...page, sections: data });
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
      alert('Error fetching page content. Check console for details.');
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0D3D21]">Content Management</h1>
        <button
          onClick={() => {
            const slug = prompt('Enter page slug (e.g., home, drivers, providers):');
            if (slug) {
              const title = prompt('Enter page title:');
              if (title) {
                createPage(slug, title);
              }
            }
          }}
          className="bg-[#7AB800] text-white px-4 py-2 rounded-lg hover:bg-[#5F9908] transition-colors w-full sm:w-auto"
        >
          + Add New Page
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* Pages List */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#D8E8D0] shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-[#0D3D21] mb-4">Pages</h2>
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => fetchPageContent(page.id)}
                className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-colors ${
                  selectedPage?.id === page.id
                    ? 'bg-[#F7FAF2] border-[#7AB800]'
                    : 'bg-white border-[#D8E8D0] hover:bg-[#F7FAF2]'
                }`}
              >
                <div className="font-semibold text-[#0D3D21] text-sm sm:text-base">{page.title}</div>
                <div className="text-xs sm:text-sm text-[#8FA489]">/{page.slug}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Page Content Editor */}
        {selectedPage && (
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 border border-[#D8E8D0] shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#0D3D21]">{selectedPage.title}</h2>
              <Link
                href={`/${selectedPage.slug}`}
                target="_blank"
                className="text-[#7AB800] hover:underline text-sm"
              >
                View Page →
              </Link>
            </div>

            {selectedPage.sections.length === 0 ? (
              <div className="text-center py-12 text-[#8FA489]">
                <p>No sections found for this page.</p>
                <button
                  onClick={() => {
                    const sectionKey = prompt('Enter section key (e.g., hero, stats_bar):');
                    if (sectionKey) {
                      createSection(selectedPage.id, sectionKey);
                    }
                  }}
                  className="mt-4 text-[#7AB800] hover:underline"
                >
                  + Add Section
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedPage.sections.map((section) => (
                  <div
                    key={section.id}
                    className="border border-[#D8E8D0] rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-[#0D3D21]">
                        {section.title || section.section_key}
                      </h3>
                      <span className="text-sm text-[#8FA489]">{section.section_key}</span>
                    </div>

                    {section.content_blocks.length === 0 ? (
                      <div className="text-center py-4 text-[#8FA489] text-sm">
                        No content blocks. <button
                          onClick={() => {
                            const blockKey = prompt('Enter block key (e.g., headline, body):');
                            if (blockKey) {
                              const blockType = prompt('Enter block type (text, image, json):');
                              if (blockType) {
                                createContentBlock(section.id, blockKey, blockType);
                              }
                            }
                          }}
                          className="text-[#7AB800] hover:underline"
                        >
                          + Add Block
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {section.content_blocks.map((block) => (
                          <ContentBlockEditor
                            key={block.id}
                            block={block}
                            onUpdate={() => fetchPageContent(selectedPage.id)}
                          />
                        ))}
                        <button
                          onClick={() => {
                            const blockKey = prompt('Enter block key (e.g., headline, body):');
                            if (blockKey) {
                              const blockType = prompt('Enter block type (text, image, json):');
                              if (blockType) {
                                createContentBlock(section.id, blockKey, blockType);
                              }
                            }
                          }}
                          className="text-sm text-[#7AB800] hover:underline"
                        >
                          + Add Content Block
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ContentBlockEditor({ block, onUpdate }: { block: any; onUpdate: () => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(
    block.block_type === 'json' ? JSON.stringify(block.content_json, null, 2) : block.content || block.image_url || ''
  );
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setValue(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const updateData: any = {};
      if (block.block_type === 'json') {
        updateData.content_json = JSON.parse(value);
      } else if (block.block_type === 'image') {
        updateData.image_url = value;
        updateData.image_alt = block.image_alt || '';
      } else {
        updateData.content = value;
      }

      const res = await fetch('/api/cms/content-blocks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: block.id, ...updateData }),
      });

      if (res.ok) {
        setEditing(false);
        onUpdate();
      }
    } catch (error) {
      console.error('Error saving block:', error);
      alert('Error saving block');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this content block?')) return;

    try {
      const res = await fetch(`/api/cms/content-blocks?id=${block.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error deleting block:', error);
      alert('Error deleting block');
    }
  };

  return (
    <div className="bg-[#F7FAF2] rounded-lg p-3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-[#8FA489] uppercase">
          {block.block_key} ({block.block_type})
        </span>
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="text-xs text-[#7AB800] hover:underline"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="text-xs text-[#8FA489] hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="text-xs text-[#7AB800] hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-red-500 hover:underline"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {editing ? (
        block.block_type === 'json' ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-[#D8E8D0] rounded font-mono text-sm"
            rows={6}
          />
        ) : block.block_type === 'image' ? (
          <div className="space-y-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Or enter image URL"
              className="w-full p-2 border border-[#D8E8D0] rounded text-sm"
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8FA489]">Or upload:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs"
              />
              {uploading && <span className="text-xs text-[#7AB800]">Uploading...</span>}
            </div>
          </div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border border-[#D8E8D0] rounded text-sm"
          />
        )
      ) : (
        <div className="text-sm text-[#0D3D21]">
          {block.block_type === 'json' ? (
            <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(block.content_json, null, 2)}
            </pre>
          ) : block.block_type === 'image' ? (
            <div>
              <div className="text-[#8FA489] text-xs mb-1">{block.image_url}</div>
              {block.image_url && (
                <img src={block.image_url} alt={block.image_alt || ''} className="max-h-24 rounded" />
              )}
            </div>
          ) : (
            block.content
          )}
        </div>
      )}
    </div>
  );
}

async function createPage(slug: string, title: string) {
  try {
    const res = await fetch('/api/cms/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, title }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert('Error creating page');
    }
  } catch (error) {
    console.error('Error creating page:', error);
    alert('Error creating page');
  }
}

async function createSection(pageId: string, sectionKey: string) {
  try {
    const res = await fetch('/api/cms/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_id: pageId, section_key: sectionKey }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert('Error creating section');
    }
  } catch (error) {
    console.error('Error creating section:', error);
    alert('Error creating section');
  }
}

async function createContentBlock(sectionId: string, blockKey: string, blockType: string) {
  try {
    const res = await fetch('/api/cms/content-blocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        section_id: sectionId,
        block_key: blockKey,
        block_type: blockType,
      }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert('Error creating content block');
    }
  } catch (error) {
    console.error('Error creating content block:', error);
    alert('Error creating content block');
  }
}
