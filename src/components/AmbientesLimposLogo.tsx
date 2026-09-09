import React from 'react';

interface AmbientesLimposLogoProps {
  variant?: 'dark' | 'light' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSlogan?: boolean;
}

/**
 * Cópia fiel da logomarca oficial Ambientes Limpos baseada no anexo da marca:
 * - Telhado em ângulo com chaminé à direita
 * - Janela interna com 4 quadrados em ciano vibrante
 * - 2 estrelas brilhantes de 4 pontas no canto superior direito
 * - Tipografia 'Ambientes limpos' em fonte cursiva caligráfica
 * - Linha divisória dourada com estrela de 4 pontas central
 * - Slogan 'CUIDADO QUE TRANSFORMA.' em ciano com espaçamento expandido
 */
export const AmbientesLimposLogo: React.FC<AmbientesLimposLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
  showSlogan = true,
}) => {
  const isLight = variant === 'light';
  
  // Cores exatas da paleta do flyer
  const roofColor = isLight ? '#ffffff' : '#0a1e38';
  const windowColor = '#00a8e8'; // Ciano vibrante
  const sparklesColor = '#00b4d8';
  const textColor = isLight ? '#ffffff' : '#0a1e38';
  const goldColor = '#f59e0b'; // Dourado radiante
  const sloganColor = isLight ? '#38bdf8' : '#0098da';

  // Dimensões do ícone conforme tamanho
  const iconDimensions = {
    sm: { width: 44, height: 32 },
    md: { width: 62, height: 44 },
    lg: { width: 84, height: 60 },
    xl: { width: 110, height: 78 },
  }[size];

  // Renderização apenas do ícone da casinha com janela e estrelas
  const HouseIcon = (
    <svg
      width={iconDimensions.width}
      height={iconDimensions.height}
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-sm transition-transform group-hover:scale-105"
    >
      {/* Chaminé no telhado à direita */}
      <path
        d="M66 22V14H73V28L66 22Z"
        fill={roofColor}
      />

      {/* Telhado estilizado com beiral marcante */}
      <path
        d="M10 38L47 6C48.5 4.8 51.5 4.8 53 6L90 38C91.5 39.2 90.5 41 88 40L83 38L50 12L17 38L12 40C9.5 41 8.5 39.2 10 38Z"
        fill={roofColor}
      />

      {/* Janela com 4 vidraças quadradas em ciano */}
      <g>
        {/* Painel superior esquerdo */}
        <rect x="42" y="22" width="7" height="7" rx="1" fill={windowColor} />
        {/* Painel superior direito */}
        <rect x="51" y="22" width="7" height="7" rx="1" fill={windowColor} />
        {/* Painel inferior esquerdo */}
        <rect x="42" y="31" width="7" height="7" rx="1" fill={windowColor} />
        {/* Painel inferior direito */}
        <rect x="51" y="31" width="7" height="7" rx="1" fill={windowColor} />
      </g>

      {/* Estrela brilhante de 4 pontas maior */}
      <path
        d="M78 9C78 12.5 75 14 72 14C75 14 78 15.5 78 19C78 15.5 81 14 84 14C81 14 78 12.5 78 9Z"
        fill={sparklesColor}
      />

      {/* Estrela brilhante de 4 pontas menor */}
      <path
        d="M87 3C87 5.5 85 6.5 83 6.5C85 6.5 87 7.5 87 10C87 7.5 89 6.5 91 6.5C89 6.5 87 5.5 87 3Z"
        fill={sparklesColor}
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <div className={`inline-flex items-center ${className}`}>{HouseIcon}</div>;
  }

  // Estilos de texto conforme o tamanho
  const titleSizeClass = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  }[size];

  const sloganSizeClass = {
    sm: 'text-[7px] tracking-[0.2em]',
    md: 'text-[9px] tracking-[0.25em]',
    lg: 'text-[11px] tracking-[0.3em]',
    xl: 'text-[13px] tracking-[0.35em]',
  }[size];

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      {/* Casinha com janela e estrelas */}
      {HouseIcon}

      {/* Nome 'Ambientes limpos' em fonte cursiva caligráfica (Dancing Script / Caveat / cursive) */}
      <span
        className={`${titleSizeClass} font-bold leading-tight -mt-1`}
        style={{
          fontFamily: "'Dancing Script', 'Caveat', 'Segoe Script', cursive",
          color: textColor,
          letterSpacing: '0.02em',
        }}
      >
        Ambientes limpos
      </span>

      {/* Divisor dourado com estrela de 4 pontas no centro e slogan */}
      {showSlogan && (
        <div className="w-full flex flex-col items-center mt-1">
          {/* Linha dourada com estrela */}
          <div className="w-full flex items-center justify-center gap-1.5 py-0.5 max-w-[200px]">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-400" />
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <path
                d="M6 0C6 3.5 3.5 6 0 6C3.5 6 6 8.5 6 12C6 8.5 8.5 6 12 6C8.5 6 6 3.5 6 0Z"
                fill={goldColor}
              />
            </svg>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-400" />
          </div>

          {/* Slogan 'CUIDADO QUE TRANSFORMA.' */}
          <span
            className={`${sloganSizeClass} font-black uppercase text-center block pt-0.5`}
            style={{ color: sloganColor }}
          >
            CUIDADO QUE TRANSFORMA.
          </span>
        </div>
      )}
    </div>
  );
};
