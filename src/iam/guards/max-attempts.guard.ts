import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class MaxAttemptsGuard implements CanActivate {
  /** Cantidad de intentos en los endpoints */
  private readonly maxAttempts = 3;
  private readonly blockIncreaseInMinutes = 5;
  private resetTime: number | null = null;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let attempts = request.session.attempts || 0;
    let blockDurationInMinutes = request.session.blockDurationInMinutes || 1;
    const currentTime: number = Date.now();

    if (this.resetTime && currentTime < this.resetTime) {
      // Si hay un tiempo de reinicio programado y aún no ha pasado, bloquear el acceso
      throw new UnauthorizedException(`Se ha excedito el limite de intentos por favor vuelva en ${blockDurationInMinutes} minutos`);
    }

    if (this.resetTime && currentTime >= this.resetTime) {
      // Si ha pasado el tiempo de reinicio, restablecer los intentos
      attempts = 0;
      this.resetTime = null;
    }

    if (attempts >= this.maxAttempts) {
      // Bloquear el acceso si se excede el número máximo de intentos
      const blockTime = currentTime + blockDurationInMinutes * 60 * 1000; // Convertir a minutos
      // Si aún estamos dentro del período de bloqueo, bloquear el acceso
      this.resetTime = blockTime;
      // Incrementar el contador de intentos para el tiempo de bloqueo
      request.session.blockDurationInMinutes = blockDurationInMinutes * this.blockIncreaseInMinutes;
      
      throw new UnauthorizedException(`Se ha excedito el limite de intentos por favor vuelva en ${blockDurationInMinutes} minutos`);
    }

    // Incrementar el contador de intentos
    request.session.attempts = attempts + 1;

    return true; // Permitir el acceso si no se ha excedido el número máximo de intentos
  }
}
