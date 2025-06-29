export interface Item {
	id: string; // Identificador único para cada tarefa (vamos usar para manipulação futura)
	description: string; // O texto da tarefa
	completed: boolean; // Se a tarefa foi concluída ou não
}

export interface List {
	label: string;
	value: string;
	items: Item[];
}

export interface WaterCounterData {
  dayCounter: number;
  isVisible: boolean;
}
