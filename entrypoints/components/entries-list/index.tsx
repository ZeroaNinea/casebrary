import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import Entry from '@/types/entry.interface';
import { Palette } from '@/types/palette.alias';

import createPalette from '@/utils/theme/palette.util';

import EntryElement from './entry-element';

import './style.css';

import ClassicIconButton from '@/entrypoints/components/buttons/classic-icon-button';

export default function EntriesList({
  entries,
  matchesSearch,
  search,
  deleteEntry,
  updateEntry,
  readEntry,
  onAddChild,
}: {
  entries: Entry[];
  matchesSearch: Entry[];
  search: string;
  deleteEntry: (id: string) => void;
  updateEntry: (updates: Entry) => void;
  readEntry: (entry: Entry) => void;
  onAddChild: (id: string) => void;
}) {
  const [isDropdownOpenId, setIsDropdownOpenId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    id: string;
    position: 'before' | 'inside' | 'after';
  } | null>(null);

  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const matchingIds = new Set(
    entries.filter((e) => matchesSearch.includes(e)).map((e) => e.id),
  );

  const visibleIds = new Set<string>();

  function geretatePalettes() {
    const palettes: Record<string, Palette> = {};
    for (const entry of entries) {
      palettes[entry.id] = createPalette(entry.color || '');
    }

    return palettes;
  }

  const palettes = geretatePalettes();

  function getChildren(parentId: string | null) {
    return entries
      .filter((e) => e.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  }

  let depth = 0;

  function addDescendants(parentId: string) {
    for (const child of entries.filter((e) => e.parentId === parentId)) {
      if (!visibleIds.has(child.id)) {
        visibleIds.add(child.id);
        addDescendants(child.id);
      }
    }
  }

  for (const id of matchingIds) {
    visibleIds.add(id);
    addDescendants(id);
  }

  const rootEntries =
    search.trim() === ''
      ? entries.filter((e) => e.parentId === null)
      : entries.filter(
          (e) =>
            visibleIds.has(e.id) &&
            (!e.parentId || !visibleIds.has(e.parentId)),
        );

  function renderChildren(parentId: string | null, depth: number) {
    const children = getChildren(parentId);

    if (children.length <= 0) {
      return null;
    }

    return (
      <ul className="relative">
        {parentId && (
          <div className="absolute -top-5 -left-4.25 w-3 h-3 z-1000">
            <ClassicIconButton
              isState
              onClick={() =>
                expandedIds.includes(parentId)
                  ? setExpandedIds(expandedIds.filter((id) => id !== parentId))
                  : setExpandedIds([...expandedIds, parentId])
              }
            >
              {expandedIds.includes(parentId) ? (
                <ChevronDown size={16} color={`var(--color-text-muted)`} />
              ) : (
                <ChevronRight size={16} color={`var(--color-text-muted)`} />
              )}
            </ClassicIconButton>
          </div>
        )}
        <div
          className={`relative flex flex-col gap-3.5 p-0 mt-3 ml-2 z-1 ${expandedIds.includes(parentId || '') ? '' : 'hidden'}`}
        >
          <div
            style={{
              animationDelay: `${Math.random() * 100}ms`,
            }}
            className="absolute top-0 -left-1 w-px h-full rounded-full opacity-50 guidelines-vertical"
          ></div>
          {children.map((child) => (
            <EntryElement
              entry={child}
              palettes={palettes}
              isDropdownOpenId={isDropdownOpenId}
              setIsDropdownOpenId={setIsDropdownOpenId}
              deleteEntry={deleteEntry}
              updateEntry={updateEntry}
              readEntry={readEntry}
              onAddChild={onAddChild}
              renderChildren={renderChildren}
              depth={depth}
              draggedId={draggedId}
              setDraggedId={setDraggedId}
              dropTarget={dropTarget}
              setDropTarget={setDropTarget}
            />
          ))}
        </div>
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-3.5 p-4.5 z-1">
      {/* {JSON.stringify(dropTarget)} */}
      {/* {JSON.stringify(draggedId)} */}
      {/* {JSON.stringify(entries)} */}
      {rootEntries
        .sort((a, b) => a.order - b.order)
        .map((entry) => (
          <EntryElement
            entry={entry}
            palettes={palettes}
            isDropdownOpenId={isDropdownOpenId}
            setIsDropdownOpenId={setIsDropdownOpenId}
            deleteEntry={deleteEntry}
            updateEntry={updateEntry}
            onAddChild={onAddChild}
            readEntry={readEntry}
            renderChildren={renderChildren}
            depth={depth}
            draggedId={draggedId}
            setDraggedId={setDraggedId}
            dropTarget={dropTarget}
            setDropTarget={setDropTarget}
          />
        ))}
    </ul>
  );
}
