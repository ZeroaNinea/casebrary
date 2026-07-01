export default function EntryEditorPage({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  return (
    <div
      className={`
        absolute inset-0
        bg-bg
        transition-transform duration-200
      `}
      style={{
        transform: show ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <button onClick={close}>Close</button>
      Entry Editor
    </div>
  );
}
