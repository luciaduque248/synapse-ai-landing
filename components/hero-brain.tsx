import Image from "next/image";
import { AudioLines, ClipboardCheck, FileText, ListChecks } from "lucide-react";
import brainPng from "@/components/cerebro_synapse_propuesta2.png";

export function HeroBrain() {
  return (
    <div className="brain-visual" aria-label="SYNAPSE transforma audio y transcriptos en decisiones, tareas y responsables">
      <Image
        src={brainPng}
        alt="Cerebro 3D de SYNAPSE AI representando conexiones entre conversación, decisiones y tareas"
        className="brain-asset"
        priority
        sizes="(max-width: 980px) 88vw, 590px"
      />

      <div className="brain-tag brain-tag--meetings">
        <AudioLines size={17} aria-hidden="true" />
        <div><span>INPUT</span><strong>Meeting audio</strong></div>
      </div>
      <div className="brain-tag brain-tag--notes">
        <FileText size={17} aria-hidden="true" />
        <div><span>INPUT</span><strong>Transcript + notes</strong></div>
      </div>
      <div className="brain-tag brain-tag--decision">
        <ClipboardCheck size={17} aria-hidden="true" />
        <div><span>OUTPUT</span><strong>Decisions</strong></div>
      </div>
      <div className="brain-tag brain-tag--actions">
        <ListChecks size={17} aria-hidden="true" />
        <div><span>OUTPUT</span><strong>Tasks + owners</strong></div>
      </div>

      <div className="brain-core-label"><span>SYNAPSE CORE</span><strong>Meeting → execution</strong></div>
    </div>
  );
}
