import { useState } from 'react';

import Entry from '@/types/entry.interface';
import { Palette } from '@/types/palette.alias';

import createPalette from '@/utils/theme/palette.util';

import EntryElement from './entry-element';

export default function EntriesList({
  entries,
  deleteEntry,
  updateEntry,
  onAddChild,
}: {
  entries: Entry[];
  deleteEntry: (id: string) => void;
  updateEntry: (updates: Entry) => void;
  onAddChild: (id: string) => void;
}) {
  const [isDropdownOpenId, setIsDropdownOpenId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    id: string;
    position: 'before' | 'inside' | 'after';
  } | null>(null);

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

  function renderChildren(parentId: string | null, depth: number) {
    const children = getChildren(parentId);

    if (children.length <= 0) {
      return null;
    }

    return (
      <ul className="relative flex flex-col gap-3.5 p-0 mt-3 ml-2 z-1">
        <div className="absolute top-0 -left-1 w-px h-full bg-border/20 rounded-full"></div>
        {children.map((child) => (
          <EntryElement
            entry={child}
            palettes={palettes}
            isDropdownOpenId={isDropdownOpenId}
            setIsDropdownOpenId={setIsDropdownOpenId}
            deleteEntry={deleteEntry}
            updateEntry={updateEntry}
            onAddChild={onAddChild}
            renderChildren={renderChildren}
            depth={depth}
            setDraggedId={setDraggedId}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-3.5 p-4.5 z-1">
      {entries
        .filter((e) => e.parentId === null)
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
            renderChildren={renderChildren}
            depth={depth}
            setDraggedId={setDraggedId}
          />
        ))}
    </ul>
  );
}
