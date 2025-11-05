import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Document, Paragraph, TextRun, AlignmentType, Packer, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

const STORAGE_KEY = 'agro-form-data';

const Index = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          organizationName: '',
          inn: '',
          address: '',
          contactPerson: '',
          phone: '',
          email: '',
          farmType: '',
          landArea: '',
          mainCrops: '',
          livestock: '',
          equipment: [] as string[],
          problems: '',
          investmentNeeds: '',
          subsidies: '',
          experience: '',
        };
      }
    }
    return {
      organizationName: '',
      inn: '',
      address: '',
      contactPerson: '',
      phone: '',
      email: '',
      farmType: '',
      landArea: '',
      mainCrops: '',
      livestock: '',
      equipment: [] as string[],
      problems: '',
      investmentNeeds: '',
      subsidies: '',
      experience: '',
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const equipmentOptions = [
    'Тракторы',
    'Комбайны',
    'Сеялки',
    'Опрыскиватели',
    'Культиваторы',
    'Прицепное оборудование',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      equipment: checked
        ? [...prev.equipment, equipment]
        : prev.equipment.filter((item) => item !== equipment),
    }));
  };

  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: 'АНКЕТА СЕЛЬСКОХОЗЯЙСТВЕННОГО ПРЕДПРИЯТИЯ',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: '1. ОБЩИЕ СВЕДЕНИЯ',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Наименование организации: ', bold: true }),
                new TextRun(formData.organizationName || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'ИНН: ', bold: true }),
                new TextRun(formData.inn || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Адрес: ', bold: true }),
                new TextRun(formData.address || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Контактное лицо: ', bold: true }),
                new TextRun(formData.contactPerson || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Телефон: ', bold: true }),
                new TextRun(formData.phone || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Email: ', bold: true }),
                new TextRun(formData.email || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              text: '2. ПРОИЗВОДСТВЕННЫЕ ХАРАКТЕРИСТИКИ',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Тип хозяйства: ', bold: true }),
                new TextRun(formData.farmType || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Площадь земельных угодий (га): ', bold: true }),
                new TextRun(formData.landArea || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Основные культуры: ', bold: true }),
                new TextRun(formData.mainCrops || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Поголовье скота: ', bold: true }),
                new TextRun(formData.livestock || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Имеющаяся техника: ', bold: true }),
                new TextRun(formData.equipment.join(', ') || '______________________'),
              ],
              spacing: { after: 150 },
            }),
            new Paragraph({
              text: '3. ПОТРЕБНОСТИ И РАЗВИТИЕ',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Основные проблемы: ', bold: true }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: formData.problems || '____________________________________________________________',
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Потребность в инвестициях: ', bold: true }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: formData.investmentNeeds || '____________________________________________________________',
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Получаемые субсидии: ', bold: true }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: formData.subsidies || '____________________________________________________________',
              spacing: { after: 150 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Опыт работы в отрасли (лет): ', bold: true }),
                new TextRun(formData.experience || '______________________'),
              ],
              spacing: { after: 300 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Дата заполнения: ', bold: true }),
                new TextRun(`${new Date().toLocaleDateString('ru-RU')}`),
              ],
              spacing: { before: 400, after: 150 },
            }),
            new Paragraph({
              text: '___________________________',
              alignment: AlignmentType.RIGHT,
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: '(подпись руководителя)',
              alignment: AlignmentType.RIGHT,
              italics: true,
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `Агроопросник_${new Date().toISOString().split('T')[0]}.docx`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white border-2 border-gray-900 p-12 shadow-sm">
          <div className="text-center mb-8 border-b-2 border-gray-900 pb-6">
            <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              Анкета сельскохозяйственного предприятия
            </h1>
            <p className="text-sm text-gray-600 mt-2">Форма для сбора информации о деятельности хозяйства</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-400">
                1. ОБЩИЕ СВЕДЕНИЯ
              </h2>
              <div className="space-y-4 pl-4">
                <div>
                  <Label htmlFor="organizationName" className="text-sm font-semibold text-gray-900">
                    Наименование организации *
                  </Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="mt-1 border-gray-400 focus:border-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inn" className="text-sm font-semibold text-gray-900">
                      ИНН *
                    </Label>
                    <Input
                      id="inn"
                      value={formData.inn}
                      onChange={(e) => handleInputChange('inn', e.target.value)}
                      className="mt-1 border-gray-400 focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
                      Телефон *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1 border-gray-400 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-900">
                    Адрес местонахождения
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1 border-gray-400 focus:border-gray-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson" className="text-sm font-semibold text-gray-900">
                      Контактное лицо
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                      className="mt-1 border-gray-400 focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-900">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1 border-gray-400 focus:border-gray-900"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-400">
                2. ПРОИЗВОДСТВЕННЫЕ ХАРАКТЕРИСТИКИ
              </h2>
              <div className="space-y-4 pl-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Тип хозяйства
                  </Label>
                  <RadioGroup value={formData.farmType} onValueChange={(value) => handleInputChange('farmType', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Растениеводство" id="crop" />
                      <Label htmlFor="crop" className="font-normal cursor-pointer">
                        Растениеводство
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Животноводство" id="livestock" />
                      <Label htmlFor="livestock" className="font-normal cursor-pointer">
                        Животноводство
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Смешанное" id="mixed" />
                      <Label htmlFor="mixed" className="font-normal cursor-pointer">
                        Смешанное
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="landArea" className="text-sm font-semibold text-gray-900">
                      Площадь земельных угодий (га)
                    </Label>
                    <Input
                      id="landArea"
                      type="number"
                      value={formData.landArea}
                      onChange={(e) => handleInputChange('landArea', e.target.value)}
                      className="mt-1 border-gray-400 focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="livestock" className="text-sm font-semibold text-gray-900">
                      Поголовье скота (голов)
                    </Label>
                    <Input
                      id="livestock"
                      type="number"
                      value={formData.livestock}
                      onChange={(e) => handleInputChange('livestock', e.target.value)}
                      className="mt-1 border-gray-400 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="mainCrops" className="text-sm font-semibold text-gray-900">
                    Основные выращиваемые культуры
                  </Label>
                  <Input
                    id="mainCrops"
                    value={formData.mainCrops}
                    onChange={(e) => handleInputChange('mainCrops', e.target.value)}
                    placeholder="Например: пшеница, ячмень, кукуруза"
                    className="mt-1 border-gray-400 focus:border-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-900 mb-2 block">
                    Имеющаяся техника и оборудование
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {equipmentOptions.map((equipment) => (
                      <div key={equipment} className="flex items-center space-x-2">
                        <Checkbox
                          id={equipment}
                          checked={formData.equipment.includes(equipment)}
                          onCheckedChange={(checked) => handleEquipmentChange(equipment, checked as boolean)}
                        />
                        <Label htmlFor={equipment} className="font-normal cursor-pointer">
                          {equipment}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-400">
                3. ПОТРЕБНОСТИ И РАЗВИТИЕ
              </h2>
              <div className="space-y-4 pl-4">
                <div>
                  <Label htmlFor="problems" className="text-sm font-semibold text-gray-900">
                    Основные проблемы в деятельности
                  </Label>
                  <Textarea
                    id="problems"
                    value={formData.problems}
                    onChange={(e) => handleInputChange('problems', e.target.value)}
                    className="mt-1 border-gray-400 focus:border-gray-900 min-h-24"
                    placeholder="Опишите основные трудности"
                  />
                </div>
                <div>
                  <Label htmlFor="investmentNeeds" className="text-sm font-semibold text-gray-900">
                    Потребность в инвестициях
                  </Label>
                  <Textarea
                    id="investmentNeeds"
                    value={formData.investmentNeeds}
                    onChange={(e) => handleInputChange('investmentNeeds', e.target.value)}
                    className="mt-1 border-gray-400 focus:border-gray-900 min-h-24"
                    placeholder="Укажите направления инвестирования"
                  />
                </div>
                <div>
                  <Label htmlFor="subsidies" className="text-sm font-semibold text-gray-900">
                    Получаемые субсидии и господдержка
                  </Label>
                  <Input
                    id="subsidies"
                    value={formData.subsidies}
                    onChange={(e) => handleInputChange('subsidies', e.target.value)}
                    className="mt-1 border-gray-400 focus:border-gray-900"
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="text-sm font-semibold text-gray-900">
                    Опыт работы в отрасли (лет)
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="mt-1 border-gray-400 focus:border-gray-900"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-900 flex justify-between items-center">
            <p className="text-xs text-gray-600">* Поля, обязательные для заполнения</p>
            <Button
              onClick={exportToWord}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8"
            >
              <Icon name="FileDown" className="mr-2" size={18} />
              Скачать Word
            </Button>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          Дата формирования: {new Date().toLocaleDateString('ru-RU')}
        </div>
      </div>
    </div>
  );
};

export default Index;