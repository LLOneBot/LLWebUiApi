import { cpus, freemem, totalmem } from 'os'
import { Request, Response } from 'express';
import { helpers } from 'envinfo'
import which from 'which-pm-runs'

// fork from https://github.com/koishijs/webui/blob/main/plugins/status/src/profile.ts
export type LoadRate = [app: number, total: number]
function memoryRate(): LoadRate {
  const total = totalmem()
  return [process.memoryUsage().rss / total, 1 - freemem() / total]
}

export function getCpuUsage() {
  let totalIdle = 0, totalTick = 0
  const cpuInfo = cpus()
  const usage = process.cpuUsage().user

  for (const cpu of cpuInfo) {
    for (const type in cpu.times) {
      totalTick += cpu.times[type as "user" | "nice" | "sys" | "idle" | "irq"]
    }
    totalIdle += cpu.times.idle
  }

  return {
    // microsecond values
    app: usage / 1000,
    used: totalTick - totalIdle,
    total: totalTick,
  }
}


export function getCpu(_req: Request, res: Response) {
  return res.status(200).json(getCpuUsage())
}
export function getMemory(_req: Request, res: Response) {
  return res.status(200).json(memoryRate())
}
export function getOS(_req: Request, res: Response) {
  helpers.getOSInfo().then(osInfo => {
    return helpers.getCPUInfo().then(cpuInfo => {
      const [[, OS], [, CPU]] = [osInfo, cpuInfo];
      const system = { OS, CPU }
      res.status(200).json(system)
    });
  }).catch(error => {
    res.status(500).json({ errr: error })
  });
}
