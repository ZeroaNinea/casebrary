import React from 'react';
import { EllipsisVertical } from 'lucide-react';

import Entry from '@/types/entry.interface';
import { Palette } from '@/types/palette.alias';

import ClassicIconButton from '@/entrypoints/components/buttons/classic-icon-button';

import EntryIcon from './entry-icon';
import DropdownMenu from './dropdown-menu';

import { moveEntry } from '@/features/entries/entries.thunks';
import { useAppDispatch } from '@/utils/store';

export default function EntryElement({
  entry,
  palettes,
  isDropdownOpenId,
  setIsDropdownOpenId,
  deleteEntry,
  updateEntry,
  onAddChild,
  renderChildren,
  depth = 0,
  draggedId,
  setDraggedId,
  dropTarget,
  setDropTarget,
}: {
  entry: Entry;
  palettes: Record<string, Palette>;
  isDropdownOpenId: string | null;
  setIsDropdownOpenId: (id: string | null) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (entry: Entry) => void;
  onAddChild: (id: string) => void;
  renderChildren: (
    parentId: string | null,
    depth: number,
  ) => React.JSX.Element | null;
  depth: number;
  draggedId: string | null;
  setDraggedId: React.Dispatch<React.SetStateAction<string | null>>;
  dropTarget: {
    id: string;
    position: 'before' | 'inside' | 'after';
  } | null;
  setDropTarget: React.Dispatch<
    React.SetStateAction<{
      id: string;
      position: 'before' | 'inside' | 'after';
    } | null>
  >;
}) {
  const dispatch = useAppDispatch();

  return (
    <li
      key={entry.id}
      id={entry.id}
      className="relative"
      style={
        {
          zIndex: isDropdownOpenId === entry.id ? 20 : undefined,
          '--primary-container': entry.color && palettes[entry.id]['100'],
          '--primary-container-hover': entry.color && palettes[entry.id]['200'],
          borderColor: entry.color
            ? `${palettes[entry.id]['300']}30`
            : undefined,
        } as React.CSSProperties
      }
      draggable
      onDragStart={() => {
        setDraggedId(entry.id);
      }}
      onDragOver={(e) => {
        e.preventDefault();

        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientY - rect.top) / rect.height;

        const position =
          ratio < 0.25 ? 'before' : ratio > 0.75 ? 'after' : 'inside';

        setDropTarget({
          id: entry.id,
          position,
        });
      }}
      onDrop={() => {
        if (!draggedId || !dropTarget) return;

        dispatch(
          moveEntry({
            draggedId: draggedId,
            targetId: dropTarget?.id,
            position: dropTarget?.position,
          }),
        );

        setDraggedId(null);
        setDropTarget(null);
      }}
    >
      {depth > 0 && (
        <div className="absolute top-8 -left-1 w-1 h-px bg-border/20 rounded-full"></div>
      )}
      <div
        className={`
          flex items-center justify-between
          bg-primary-container/20 hover:bg-primary-container/45 backdrop-blur-[2px]
          p-3.5 rounded-2xl
          border border-border/10
          shadow-xs hover:shadow-md hover:shadow-primary/5 hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-200 ease-out cursor-pointer
        `}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl text-primary-title shrink-0"
            style={{
              backgroundColor: entry.color
                ? `${palettes[entry.id]['200']}40`
                : 'var(--color-primary-container)',
              color: entry.color
                ? palettes[entry.id]['800']
                : 'var(--color-primary-title)',
            }}
          >
            {/* {renderIcon(entry)} */}
            <EntryIcon entry={entry} />
          </div>
          <h1 className="font-semibold text-text text-sm tracking-wide">
            {entry.title}
          </h1>
        </div>
        <div className="relative">
          <ClassicIconButton
            title="Options"
            isState={true}
            onClick={() => {
              if (isDropdownOpenId === entry.id) {
                setIsDropdownOpenId(null);
              } else {
                setIsDropdownOpenId(entry.id);
              }
            }}
          >
            <EllipsisVertical
              size={18}
              style={
                {
                  '--primary-title': entry.color && palettes[entry.id]['800'],
                } as React.CSSProperties
              }
              color="var(--color-primary-title)"
            />
          </ClassicIconButton>
        </div>
      </div>
      <DropdownMenu
        entry={entry}
        isDropdownOpenId={isDropdownOpenId}
        setIsDropdownOpenId={setIsDropdownOpenId}
        deleteEntry={deleteEntry}
        updateEntry={updateEntry}
        onAddChild={onAddChild}
      />
      {renderChildren(entry.id, depth + 1)}
    </li>
  );
}
