import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { useInView, prefersReducedMotion } from "@/lib/hooks";
import { formatIt } from "@/lib/format";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/* ─── Reveal ─────────────────────────────────────────────────── */
type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "tilt" | "blur";

export function Reveal({
  as,
  variant = "up",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", `reveal-${variant}`, inView && "is-in", className)}
      style={{ "--d": `${delay}ms`, ...style } as Vars}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ─── Counter ────────────────────────────────────────────────── */
export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1700,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ rootMargin: "0px 0px -5% 0px" });
  const [display, setDisplay] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const from = current.current;
    const to = value;
    if (prefersReducedMotion() || from === to) {
      current.current = to;
      setDisplay(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const v = from + (to - from) * eased;
      current.current = v;
      setDisplay(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${formatIt(value, decimals)}${suffix}`}</span>
      <span aria-hidden="true" className="tabular-nums">
        {prefix}
        {formatIt(display, decimals)}
        {suffix}
      </span>
    </span>
  );
}

/* ─── Nastro adesivo ─────────────────────────────────────────── */
export function Tape({
  className,
  variant = "kraft",
  rotate = -6,
  width = 96,
  height = 26,
  style,
}: {
  className?: string;
  variant?: "kraft" | "white" | "ink" | "red";
  rotate?: number;
  width?: number | string;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("tape", variant !== "kraft" && `tape--${variant}`, className)}
      style={
        {
          "--tr": `${rotate}deg`,
          "--tw": typeof width === "number" ? `${width}px` : width,
          "--th": `${height}px`,
          ...style,
        } as Vars
      }
    />
  );
}

/* ─── Scarabocchi a mano libera ──────────────────────────────── */
const SCRIBBLES = {
  underline: {
    vb: "0 0 300 24",
    d: [
      "M3 15 C 40 6, 80 20, 120 11 S 200 4, 240 12 S 285 14, 297 9",
      "M18 20 C 70 13, 140 21, 210 15 S 270 13, 290 16",
    ],
  },
  loop: {
    vb: "0 0 200 120",
    d: [
      "M10 70 C 20 20, 60 10, 70 50 C 78 85, 40 95, 45 60 C 50 25, 110 15, 120 55 C 128 90, 85 100, 92 62 C 98 30, 160 20, 170 58 C 176 82, 150 95, 150 70 C 150 50, 175 40, 192 48",
    ],
  },
  zigzag: {
    vb: "0 0 140 120",
    d: ["M8 14 L 40 104 L 30 10 L 66 110 L 58 8 L 96 106 L 86 12 L 126 100"],
  },
  circle: {
    vb: "0 0 220 90",
    d: ["M120 10 C 60 4, 10 20, 12 46 C 14 74, 90 86, 160 76 C 214 68, 220 36, 186 20 C 150 4, 80 8, 50 18"],
  },
  arrow: {
    vb: "0 0 140 70",
    d: ["M6 52 C 36 18, 82 10, 126 30", "M108 14 L 128 31 L 104 42"],
  },
  star: {
    vb: "0 0 60 60",
    d: ["M30 4 L 36 24 L 56 24 L 40 36 L 46 56 L 30 44 L 14 56 L 20 36 L 4 24 L 24 24 Z"],
  },
  scratch: {
    vb: "0 0 160 120",
    d: [
      "M10 30 C 40 20, 70 60, 100 26 S 150 40, 120 70 S 40 60, 60 96 S 140 100, 150 84",
      "M20 64 L 140 22",
      "M30 104 L 132 52",
    ],
  },
  spiral: {
    vb: "0 0 120 120",
    d: [
      "M62 60 C 62 54, 70 54, 70 61 C 70 70, 56 72, 53 62 C 49 49, 66 42, 76 50 C 88 60, 82 80, 64 82 C 44 84, 36 64, 42 50 C 50 32, 76 28, 90 42 C 104 58, 98 88, 74 96 C 48 104, 26 86, 26 62 C 26 36, 48 18, 74 20",
    ],
  },
} as const;

export type ScribbleKind = keyof typeof SCRIBBLES;

export function Scribble({
  kind,
  className,
  strokeWidth = 2.2,
  mode = "view",
  delay = 0,
  style,
}: {
  kind: ScribbleKind;
  className?: string;
  strokeWidth?: number;
  mode?: "view" | "auto" | "static";
  delay?: number;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<SVGSVGElement>();
  const s = SCRIBBLES[kind];
  return (
    <svg
      ref={ref}
      viewBox={s.vb}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn(mode === "view" && "draw", mode === "view" && inView && "is-in", mode === "auto" && "draw-auto", className)}
      style={{ "--d": `${delay}ms`, ...style } as Vars}
    >
      {s.d.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/* ─── Mezzetinte ─────────────────────────────────────────────── */
export function Halftone({
  src,
  alt,
  className,
  dots = false,
  zoom = true,
  eager = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  dots?: boolean;
  zoom?: boolean;
  eager?: boolean;
  width?: number;
  height?: number;
}) {
  if (dots) {
    return (
      <div className={cn("ht-dots", className)}>
        <div className="ht-dots__screen">
          <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" width={width} height={height} />
        </div>
      </div>
    );
  }
  return (
    <div className={cn("ht", zoom && "ht-zoom", className)}>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" width={width} height={height} />
    </div>
  );
}

/* ─── Glifi pixel ────────────────────────────────────────────── */
const GLYPHS: Record<string, string[]> = {
  N: ["X...X", "XX..X", "XX..X", "X.X.X", "X..XX", "X..XX", "X...X"],
  M: ["X...X", "XX.XX", "X.X.X", "X.X.X", "X...X", "X...X", "X...X"],
  I: ["XXX", ".X.", ".X.", ".X.", ".X.", ".X.", "XXX"],
  C: [".XXXX", "XX...", "X....", "X....", "X....", "XX...", ".XXXX"],
  "1": [".XX", "XXX", ".XX", ".XX", ".XX", ".XX", "XXXX"],
  "3": ["XXXX.", "...XX", "...XX", ".XXX.", "...XX", "...XX", "XXXX."],
};

export function PixelGlyph({
  char,
  className,
  seed = 7,
  baseDelay = 0,
  style,
}: {
  char: keyof typeof GLYPHS | string;
  className?: string;
  seed?: number;
  baseDelay?: number;
  style?: CSSProperties;
}) {
  const rows = GLYPHS[char] ?? GLYPHS.N;
  const cols = Math.max(...rows.map((r) => r.length));
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const cells: { on: boolean; d: number; jx: number; jy: number }[] = [];
  rows.forEach((row) => {
    for (let c = 0; c < cols; c++) {
      cells.push({
        on: row[c] === "X",
        d: baseDelay + Math.round(rand() * 800),
        jx: Math.round((rand() - 0.5) * 14),
        jy: Math.round((rand() - 0.5) * 14),
      });
    }
  });
  const grid = (red: boolean) => (
    <div
      className={cn("px-glyph", red && "px-glyph--red absolute inset-0 translate-x-[7%] translate-y-[4.5%]")}
      style={{ "--cols": cols } as Vars}
    >
      {cells.map((c, i) =>
        c.on ? (
          <span key={i} className="px" style={{ "--pd": `${c.d}ms`, "--jx": `${c.jx}px`, "--jy": `${c.jy}px` } as Vars} />
        ) : (
          <span key={i} />
        )
      )}
    </div>
  );
  return (
    <div aria-hidden="true" className={cn("px-wrap relative", className)} style={style}>
      {grid(true)}
      <div className="relative">{grid(false)}</div>
    </div>
  );
}

/* ─── Sticker rotante ────────────────────────────────────────── */
export function Sticker({
  text,
  className,
  children,
  size = 132,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
  size?: number;
}) {
  const raw = useId();
  const id = `sticker-${raw.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div
      aria-hidden="true"
      className={cn("relative grid shrink-0 place-items-center rounded-full", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id={id} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text fontFamily="JetBrains Mono, monospace" fontSize="7.4" letterSpacing="2.1" fill="currentColor">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ─── Intestazione di sezione ────────────────────────────────── */
export function SectionHeading({
  index,
  kicker,
  title,
  intro,
  id,
  align = "left",
  dark = false,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className={cn("font-pixel text-sm", dark ? "text-volt" : "text-signal-ink")}>{index}</span>
        <span className="h-px w-10 bg-current opacity-50" />
        <span className={cn("label", dark ? "text-paper/70" : "text-graphite")}>{kicker}</span>
      </Reveal>
      <Reveal
        as="h2"
        id={id}
        data-focus-target
        delay={80}
        className="balance mt-5 text-[clamp(2.15rem,5.2vw,4.1rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
      >
        {title}
      </Reveal>
      {intro && (
        <Reveal
          as="p"
          delay={160}
          className={cn(
            "pretty mt-6 text-[1.075rem] leading-relaxed sm:text-lg",
            dark ? "text-paper/70" : "text-graphite",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {intro}
        </Reveal>
      )}
    </div>
  );
}

/* ─── Corsivo editoriale ─────────────────────────────────────── */
export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return <em className={cn("font-serif font-normal italic tracking-[-0.01em]", className)}>{children}</em>;
}
